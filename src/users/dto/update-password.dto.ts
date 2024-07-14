import { ApiProperty } from '@nestjs/swagger'
import { IsString, Length } from 'class-validator'

export class UpdatePasswordDto {
  @ApiProperty({ example: '12345', description: 'User password' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 25, { message: 'Should have at least 4 and no more than 25 characters.' })
  readonly password: string
}
