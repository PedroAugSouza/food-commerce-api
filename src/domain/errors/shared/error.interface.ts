import { ApiProperty } from '@nestjs/swagger';

export class IError {
  @ApiProperty()
  readonly reason: string;

  @ApiProperty()
  readonly message: string;
}
