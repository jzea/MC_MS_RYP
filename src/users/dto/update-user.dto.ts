import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, IsInt, IsEnum, IsNotEmpty, IsOptional, Matches } from 'class-validator'

export class UpdateUserDto {
  readonly username: string

  @ApiProperty({ example: 'admin@gmail.com', description: 'User email' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Should be a valid email.' })
  @IsOptional()
  readonly email?: string

  @ApiProperty({ example: 'Antoni', description: 'User first name' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  readonly name: string

  @ApiProperty({ example: 'Zea', description: 'User last name' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Surname field cannot be empty' })
  @IsOptional()
  readonly surname?: string

  @ApiProperty({ example: '123456789', description: 'User phone number' })
  @IsString({ message: 'Should be a string' })
  @Matches(/^[0-9]+$/, { message: 'The phone number must contain only numbers' })
  @IsOptional()
  readonly phone_number?: string

  @ApiProperty({ enum: ['passport', 'identity_card', 'business_registration'], description: 'Type of identity document' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly document_type?: string

  @ApiProperty({ example: '1234567890', description: 'User identity document number' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly document_number?: string

  @ApiProperty({ example: 1, description: 'User type identifier' })
  @IsInt()
  @IsOptional()
  readonly user_type?: number

  @ApiProperty({ example: 1, description: 'Identifier of the user profile picture gallery' })
  @IsInt()
  @IsOptional()
  readonly file_profile_picture?: number

  @ApiProperty({ example: '2023-12-22', description: 'User birthday' })
  @IsString({ message: 'Should be a date' })
  @IsOptional()
  readonly birthdate?: string

  @ApiProperty({ enum: ['Hombre', 'Mujer'], description: 'Gender' })
  @IsEnum(['Hombre', 'Mujer'])
  @IsOptional()
  readonly sex?: string

  @ApiProperty({ example: 'Colombia', description: 'User country name' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly country?: string

  @ApiProperty({ example: 'fcm_token', description: 'User FCM token' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly token_fcm?: string

  @ApiProperty({ example: 1, description: 'Address identifier' })
  @IsInt()
  @IsOptional()
  readonly idaddress?: number

  @ApiProperty({ example: 'es', description: 'Language of the user' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The lang field cannot be empty' })
  @IsOptional()
  lang?: string
}
