import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, Length, IsInt, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsNumber, Matches } from 'class-validator'

export class CreateUserDto {
  readonly username: string

  @ApiProperty({ example: 'admin@gmail.com', description: 'User email address' })
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Should be a valid email address.' })
  @IsOptional()
  readonly email?: string

  @ApiProperty({ example: '12345', description: 'User password' })
  @IsString({ message: 'Should be a string' })
  @Length(4, 25, {
    message: 'Should be at least 4 and no more than 25 characters.',
  })
  @IsOptional()
  readonly password?: string

  @ApiProperty({ example: 'Antoni', description: 'User name' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The name field cannot be empty' })
  readonly name: string

  @ApiProperty({ example: 'Zea', description: 'User surname' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The surname field cannot be empty' })
  @IsOptional()
  readonly surname?: string

  @ApiProperty({ example: '123456789', description: 'User phone number' })
  @IsString({ message: 'Should be a string' })
  @Matches(/^[0-9]+$/, { message: 'The phone number must contain only numbers' })
  @IsOptional()
  readonly phone_number?: string

  @ApiProperty({
    enum: ['passport', 'identity_card', 'business_registration'],
    description: 'Type of identity document',
  })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly document_type?: string

  @ApiProperty({
    example: '1234567890',
    description: 'Identity document number',
  })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly document_number?: string

  @ApiProperty({ example: 1, description: 'User type identifier' })
  @IsInt()
  @IsOptional()
  readonly user_type?: number

  @ApiProperty({
    example: 1,
    description: 'Profile picture gallery identifier',
  })
  @IsInt()
  @IsOptional()
  readonly file_profile_picture?: number

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user accepts the terms and conditions',
  })
  @IsBoolean()
  readonly accept_terms: boolean

  @ApiProperty({ example: '2023-12-22', description: 'Birthday' })
  @IsString({ message: 'Should be a date' })
  @IsOptional()
  readonly birthdate?: string

  @ApiProperty({ enum: ['Hombre', 'Mujer'], description: 'Gender' })
  @IsEnum(['Hombre', 'Mujer'])
  @IsOptional()
  readonly sex?: string

  @ApiProperty({ example: 'Colombia', description: 'User country name' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The country field cannot be empty' })
  @IsOptional()
  readonly country?: string

  @ApiProperty({ example: 1, description: 'Country identifier' })
  @IsInt()
  @IsOptional()
  readonly idcountry?: number

  @ApiProperty({ example: 'fcm_token', description: 'User FCM token' })
  @IsString({ message: 'Should be a string' })
  @IsOptional()
  readonly token_fcm?: string

  @ApiProperty({ example: 'firebase_uid_example', description: 'Firebase UID' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The firebase UID field cannot be empty' })
  @IsOptional()
  readonly uid_firebase?: string

  @ApiProperty({ example: 'facebook', description: 'Authentication method' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The uid_reference field cannot be empty' })
  @IsOptional()
  readonly uid_reference?: string | null

  @ApiProperty({ example: 1, description: 'Address identifier' })
  @IsInt()
  @IsOptional()
  readonly idaddress?: number

  @ApiProperty({ example: 'es', description: 'Language of the user' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'The lang field cannot be empty' })
  @IsOptional()
  lang?: string

  @ApiProperty({ example: 1, description: 'File documents ID' })
  @IsNumber({}, { message: 'The file_documents field should be a number' })
  @IsOptional()
  file_documents?: number
  active: boolean
}
