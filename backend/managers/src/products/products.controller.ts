import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  UseGuards,
  Res,
  Patch,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Manager } from 'src/managers/entities/manager.entity';
import { StoresGuard } from 'src/stores/stores.guard';
import { Store } from 'src/stores/entities/store.entity';
import { Request, Response, query } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { extname } from 'path';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

const BASE_URL_IMAGE_PRODUCTS = 'uploads/products';

@ApiTags('Products')
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
    return await this.productsService.findByIdAndManagerId({
      managerId: req.manager.id,
      productId,
    });
  }

  @Get()
  async findAllByStore(
    @Req() request: { manager: Partial<Manager>; store: Partial<Store> },
    @Query() filters: { category: string },
  ) {
    const data = {
      managerId: request.manager.id,
      storeId: request?.store.id,
    };

    return await this.productsService.findByStoreWithFilters(data, filters);
  }

  @Patch(':productId')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: multer.diskStorage({
        destination: BASE_URL_IMAGE_PRODUCTS,
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

      const CONDITION_TO_NULL_PHOTO = 'NOTFOUND';

      if (file?.filename) body.photo = file?.filename;
      else if (body.photo === CONDITION_TO_NULL_PHOTO) body.photo === null;
      else delete body.photo;

      await this.productsService.update({
        updateProductDto: body,
        managerId,
        productId,
      });

      return res.status(200).json({
        message: 'Atualizado com sucesso!',
        error: false,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
