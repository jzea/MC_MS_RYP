import { ApiProperty } from '@nestjs/swagger'
import { IsInt, IsNotEmpty } from 'class-validator'

export class CreatePermissionsRolesAdminDto {
  @ApiProperty({ example: 1, description: 'ID of the permission' })
  @IsInt({ message: 'The idpermission_admin field should be an integer' })
  @IsNotEmpty({ message: 'The idpermission_admin field cannot be empty' })
  idpermission_admin: number

  @ApiProperty({ example: 1, description: 'ID of the role' })
  @IsInt({ message: 'The idrole_admin field should be an integer' })
  @IsNotEmpty({ message: 'The idrole_admin field cannot be empty' })
  idrole_admin: number
}
