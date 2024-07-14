import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'

import { CreateSellerDto } from './create-seller.dto'

export class UpdateSellerDto extends PartialType(CreateSellerDto) {
  @ApiProperty({ example: '123456789', description: 'Tax ID number of the seller' })
  @IsString({ message: 'The number_rut field should be a string' })
  @IsNotEmpty({ message: 'The number_rut field cannot be empty' })
  @IsOptional()
  number_rut?: string

  @ApiProperty({ example: 'www.example.com', description: "Seller's website" })
  @IsString({ message: 'The website field should be a string' })
  @IsOptional()
  website?: string | null

  @ApiProperty({ example: 'ABC Company', description: "Name of the seller's company" })
  @IsString({ message: 'The company_name field should be a string' })
  @IsOptional()
  company_name?: string | null

  @ApiProperty({ example: 'contact@example.com', description: "Email of the seller's company" })
  @IsEmail({}, { message: 'Should be a valid email address' })
  @IsOptional()
  company_email?: string | null

  @ApiProperty({ example: '+51911111111', description: "Phone number of the seller's company" })
  @IsString({ message: 'The company_phone field should be a string' })
  @IsOptional()
  company_phone?: string | null

  @ApiProperty({ example: 1, description: "ID of the file representing the company's constitution" })
  @IsInt({ message: 'The file_company_constitution field should be an integer' })
  @IsOptional()
  file_company_constitution?: number | null

  @ApiProperty({ example: 1, description: 'Id gallery of identification documents' })
  @IsInt({ message: 'The file_identity_verification field should be an integer' })
  @IsOptional()
  file_identity_verification?: number | null

  @ApiProperty({ example: 1, description: 'ID indicating the type of seller' })
  @IsInt({ message: 'The type_seller field should be an integer' })
  @IsOptional()
  type_seller?: number | null

  @ApiProperty({ example: '12345', description: 'Postal code' })
  @IsString({ message: 'The postal_code field should be a string' })
  @IsNotEmpty({ message: 'The postal_code field cannot be empty' })
  postal_code: string | null

  @ApiProperty({ example: '123 Main St', description: 'Address' })
  @IsString({ message: 'The address field should be a string' })
  @IsNotEmpty({ message: 'The address field cannot be empty' })
  address: string | null

  @ApiProperty({ example: true, description: 'Indicator for the main address' })
  main_address: boolean

  @ApiProperty({ example: 1, description: 'ID of the associated city' })
  @IsInt({ message: 'The idcity field should be an integer' })
  idcity: number

  idaddress: number

  @ApiProperty({ example: true, description: 'Indicates if the number also has WhatsApp' })
  @IsBoolean()
  readonly whatsapp_number: boolean

  @ApiProperty({ example: 1, description: 'ID of the legal representative' })
  @IsInt({ message: 'The idlegal_representative field should be an integer' })
  @IsOptional()
  idlegal_representative?: number | null
}
