import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsInt, IsOptional } from 'class-validator'

export class CreateUserAdminDto {
  @ApiProperty({ example: 'John Doe', description: 'Name of the admin user' })
  @IsString({ message: 'The name_user field should be a string' })
  @IsOptional()
  name_user?: string | null

  @ApiProperty({ example: 'admin@example.com', description: 'Email of the admin user' })
  @IsEmail({}, { message: 'Should be a valid email address' })
  @IsOptional()
  email?: string | null

  @ApiProperty({ example: 'hashedPassword', description: 'Password of the admin user' })
  @IsString({ message: 'The password field should be a string' })
  @IsOptional()
  password?: string | null

  @ApiProperty({ example: 1, description: 'ID of the admin role' })
  @IsInt({ message: 'The idrole_admin field should be an integer' })
  idrole_admin: number

  @ApiProperty({ example: 1, description: 'ID of the photo gallery' })
  @IsInt({ message: 'The photo_idgallery field should be an integer' })
  @IsOptional()
  photo_idgallery: number
}
