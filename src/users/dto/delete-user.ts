import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt } from 'class-validator'

export class DeleteUserDto {
  @ApiProperty({ example: 1, description: 'Unique identifier of the user' })
  @IsInt()
  readonly iduser: number

  @ApiProperty({ example: 'Banned', description: 'Reason for user deletion' })
  @IsString({ message: 'Should be a string' })
  readonly comment: string
}
