import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('products')
export class GetImageProductController {
  @Get('/image/:image')
  async handle(@Param('image') image: string, @Res() res) {
    const imagePath = `./uploads/${image}`;
    return res.sendFile(imagePath, { root: '.' });
  }
}
