import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { OutputGetProductImageDTO } from './get-product-image.dto';

@Controller('product')
export class GetImageProductController {
  @Get('/image/:image')
  @ApiResponse({
    type: OutputGetProductImageDTO,
  })
  async handle(@Param('image') image: string, @Res() res) {
    const imagePath = `./.tmp/uploads/products/${image}`;
    return res.sendFile(imagePath, { root: '.' });
  }
}
