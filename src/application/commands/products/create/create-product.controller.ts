import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductUseCase } from './create-product.use-case';
import { InputCreateProductDTO } from 'src/domain/use-cases/products/create/create-products.dto';
import { UnexpectedError } from 'src/infrastructure/errors/shared/unexpected.error';
import { MissingParamError } from 'src/infrastructure/errors/shared/missing-param.error';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from 'src/infrastructure/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('product')
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './.tmp/uploads',
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
      image: `/product/image/${file.filename}`,
    });
    if (result.value instanceof UnexpectedError)
      throw new HttpException(result.value, HttpStatus.INTERNAL_SERVER_ERROR);

    if (result.value instanceof MissingParamError)
      throw new HttpException(result.value, HttpStatus.NOT_ACCEPTABLE);

    return result.value;
  }
}
