import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsOptional, Matches } from 'class-validator'

export class VerifyUserDto {
  @ApiProperty({ example: 'admin@gmail.com', description: 'User email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Should be a valid email.' })
  @IsOptional()
  readonly email?: string

  @ApiProperty({ example: '123456789', description: 'User phone number' })
  @IsString({ message: 'Should be a string' })
  @Matches(/^[0-9]+$/, { message: 'The phone number must contain only numbers' })
  @IsOptional()
  readonly phone_number?: string
}
