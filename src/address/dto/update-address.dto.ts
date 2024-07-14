import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsInt, IsNotEmpty, IsString } from 'class-validator'

import { CreateAddressDto } from './create-address.dto'

export class UpdateAddressDto extends PartialType(CreateAddressDto) {
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
}
