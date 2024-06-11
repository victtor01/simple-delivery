import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  UseGuards,
  Res,
  Put,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Manager } from 'src/managers/entities/manager.entity';
import { StoresGuard } from 'src/stores/stores.guard';
import { Store } from 'src/stores/entities/store.entity';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';
import { UpdateProductDto } from './dto/update-product.dto';

@UseGuards(StoresGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  private storage = multer.diskStorage({
    destination: './uploads/products',
    filename: (_, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
      callback(null, filename);
    },
  });

  private uploadFileProduct = multer({ storage: this.storage });

  private readonly BASE_URL_IMAGE_PRODUCTS = '/uploads/products';

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: { manager: Manager; store: Store },
  ) {
    const {
      manager: { id: managerId },
      store: { id: storeId },
    } = request;

    const created = await this.productsService.create({
      createProductDto,
      managerId,
      storeId,
    });

    return created;
  }

  @Get(':productId')
  async findById(
    @Req() req: { manager: Manager },
    @Param('productId') productId: string,
  ) {
    return await this.productsService.findById({
      managerId: req.manager.id,
      productId,
    });
  }

  @Get()
  findAllByStore(
    @Req() request: { manager: Partial<Manager>; store: Partial<Store> },
  ) {
    return this.productsService.findByStore({
      managerId: request.manager.id,
      storeId: request?.store.id,
    });
  }

  @Patch(':productId')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: multer.diskStorage({
        destination: 'uploads/products',
        filename: (_, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.originalname}-${uniqueSuffix}-${ext}`;

          callback(null, filename);
        },
      }),
    }),
  )
  async update(
    @Res() res: Response,
    @Req() req: { manager: Manager },
    @Param('productId') productId: string,
    @Body() body: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File | null,
  ) {
    try {
      const { id: managerId } = req.manager;
  
      await this.productsService.update({
        managerId,
        productId,
        updateProductDto: {
          ...body,
          photo: file?.filename || null
        },
      });
  
      return res.status(200).json({
        message: "Atualizado com sucesso!",
        error: false,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
