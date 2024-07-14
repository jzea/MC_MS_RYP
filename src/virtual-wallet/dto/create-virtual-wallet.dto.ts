import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsDecimal } from 'class-validator'

export class CreateVirtualWalletDto {
  @ApiProperty({ example: 1, description: 'Identifier of the associated user' })
  @IsNumber({}, { message: 'Should be a number' })
  iduser: number

  @ApiProperty({ example: '1000.00', description: 'Available balance in the virtual wallet' })
  @IsDecimal({}, { message: 'Should be a decimal number' })
  available_balance: number

  @ApiProperty({ example: '500.00', description: 'Retained balance in the virtual wallet' })
  @IsDecimal({}, { message: 'Should be a decimal number' })
  retained_balance: number
}
