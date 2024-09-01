import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('product')
export class GetImageProductController {
  @Get('/image/:image')
  async handle(@Param('image') image: string, @Res() res) {
    const imagePath = `./.tmp/uploads/${image}`;
    return res.sendFile(imagePath, { root: '.' });
  }
}
