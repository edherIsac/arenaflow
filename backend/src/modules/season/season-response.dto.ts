import { ApiProperty } from '@nestjs/swagger';

export class SeasonResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  league: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty()
  inicio: Date;

  @ApiProperty()
  fin: Date;

  @ApiProperty()
  dateAt: Date;

  @ApiProperty({ default: true })
  isActive: boolean;
}
