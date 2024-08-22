import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductUseCase } from './create-product.use-case';
import { InputCreateProductDTO } from 'src/domain/use-cases/products/create/create-products.dto';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('product')
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: async (req, file, cb) => {
          const filename = file.originalname
            .replace(' ', '-')
            .toLocaleLowerCase();

          cb(null, filename);
        },
      }),
    }),
  )
  async handle(
    @Body() input: InputCreateProductDTO,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    const result = await this.createProductUseCase.execute({
      ...input,
      image: `/uploads/${file.filename}`,
    });
    if (result.value instanceof UnexpectedError) throw result.value;

    if (result.value instanceof MissingParamError) throw result.value;

    return result.value;
  }
}
