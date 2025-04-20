import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchDto } from './create-match.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @ApiProperty({
    description: 'Estado del match',
    example: false,
    required: false,
  })
  isActive?: boolean;
}
