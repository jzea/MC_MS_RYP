import { PartialType } from '@nestjs/swagger'

import { CreatePermissionsRolesAdminDto } from './create-permissions-roles-admin.dto'

export class UpdatePermissionsRolesAdminDto extends PartialType(CreatePermissionsRolesAdminDto) {}
