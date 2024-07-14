import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class UpdateActiveDto {
  @ApiProperty({ example: true, description: 'active user' })
  @IsBoolean({ message: 'The status field should be a boolean' })
  active: boolean
}
