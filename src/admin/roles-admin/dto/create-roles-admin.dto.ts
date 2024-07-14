import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsOptional } from 'class-validator'

export class CreateRoleAdminDto {
  @ApiProperty({ example: 'Admin', description: 'Name of the admin role' })
  @IsString({ message: 'The name_rol field should be a string' })
  @IsOptional()
  name_role?: string | null

  active?: boolean | null
  iduser_creator?: number | null
}
