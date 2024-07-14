import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateRolesAdminDto {
  @ApiProperty({ example: 'Admin', description: 'Name of the admin role' })
  @IsString({ message: 'The name_rol field should be a string' })
  @IsOptional()
  name_role?: string | null

  @ApiProperty({ example: true, description: 'Activation status of the admin role' })
  @IsBoolean({ message: 'The active field should be a boolean' })
  @IsOptional()
  active?: boolean | null
}
