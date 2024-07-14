import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean } from 'class-validator'

export class UpdateApprovedDto {
  @ApiProperty({ example: true, description: 'approved seller' })
  @IsBoolean({ message: 'The status field should be a boolean' })
  approved: boolean
}
