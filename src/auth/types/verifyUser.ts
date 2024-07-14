import { ApiProperty } from '@nestjs/swagger'

export class VerifyAprovedSellerDto {
  @ApiProperty({ example: 'true', description: 'User aprroved' })
  isApprovedSeller: boolean

  @ApiProperty({ example: 'true', description: 'User is seller' })
  isUserSeller: boolean

  @ApiProperty({ example: 'true', description: 'User is approved' })
  isUserApproved: boolean

  @ApiProperty({ example: '1', description: 'User type' })
  user_type: number
}
