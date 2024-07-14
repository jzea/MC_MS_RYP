import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator'

export class BlockPermissionsRolesAdminDto {
  @ApiProperty({ example: 1, description: 'ID of the permission' })
  @IsInt({ message: 'The idpermission_admin field should be an integer' })
  @IsNotEmpty({ message: 'The idpermission_admin field cannot be empty' })
  idpermission_admin: number

  @ApiProperty({ example: true, description: 'Status of the permission' })
  @IsBoolean({ message: 'The active field should be a boolean' })
  status: boolean
}
