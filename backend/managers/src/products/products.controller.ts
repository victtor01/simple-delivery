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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Manager } from 'src/managers/entities/manager.entity';
import { StoresGuard } from 'src/stores/stores.guard';
import { Store } from 'src/stores/entities/store.entity';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@UseGuards(StoresGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

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

  @Patch()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: "uploads/products",
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
  async updatePicture(
    @UploadedFile() file: Express.Multer.File,
    @Res() response: Response,
  ) {
    response.status(200).json({
      url: `${this.BASE_URL_IMAGE_PRODUCTS}/${file.filename}`
    })
  }
}
