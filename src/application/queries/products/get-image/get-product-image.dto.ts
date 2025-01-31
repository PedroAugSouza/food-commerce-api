import { ApiProperty } from '@nestjs/swagger';

export class OutputGetProductImageDTO {
  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;
}
