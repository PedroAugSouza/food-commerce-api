import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Controller('product')
@ApiResponse({
  status: 200,
  content: {
    'application/json': {
      schema: {
        properties: {
          image: { type: 'string', format: 'binary' },
        },
      },
    },
  },
})
export class GetImageProductController {
  @Get('/image/:image')
  async handle(@Param('image') image: string, @Res() res) {
    const imagePath = `./.tmp/uploads/products/${image}`;
    return res.sendFile(imagePath, { root: '.' });
  }
}
