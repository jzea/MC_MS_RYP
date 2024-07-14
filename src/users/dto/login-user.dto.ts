import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
  @ApiProperty({ example: 'admin@gmail.com', description: 'User email address' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Should be a valid email address' })
  @IsNotEmpty({ message: 'The email field cannot be empty' })
  readonly email: string

  @ApiProperty({ example: '12345', description: 'User password' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 25, { message: 'Should have at least 4 and no more than 25 characters.' })
  @IsNotEmpty({ message: 'The password field cannot be empty' })
  readonly password: string
}
