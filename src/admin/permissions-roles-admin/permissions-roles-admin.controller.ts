import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, ValidationPipe, Param, Delete } from '@nestjs/common'
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiCustomResponse } from 'src/decorators/api-custom-response.decorator'
import { language } from 'src/main'
import { Messages } from 'src/utils/messages.enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { HttpResponse } from 'src/response/http.response'

import { PermissionsRolesAdminService } from './permissions-roles-admin.service'
import { PermissionsRoleAdmin } from './permissions-roles-admin.model'
import { CreatePermissionsRolesAdminDto } from './dto/create-permissions-roles-admin.dto'
import { BlockPermissionsRolesAdminDto } from './dto/block-permissions-roles-admin.dto'

@ApiBearerAuth()
@ApiTags('Permissions roles admin')
@ApiExtraModels(PermissionsRoleAdmin)
@Controller('admin/permissions-roles')
export class PermissionsRolesAdminController {
  constructor(private readonly permissionsRolesAdminService: PermissionsRolesAdminService) {}

  /**
   * Handles the request to get all permissions assigned to roles.
   * @returns {HttpResponse} HTTP response with permissions assigned to roles.
   */
  @ApiOperation({ summary: 'Get all permissions assigned to roles' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_ALL_ADMIN_PERMISSIONS_ROLES[language.code], 'PermissionsRoleAdmin', '', true)
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllPermissionsRoles() {
    try {
      const data = await this.permissionsRolesAdminService.getAll()
      return HttpResponse.success(data, Messages.GET_ALL_ADMIN_PERMISSIONS_ROLES[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Create a new admin permissions role.
   * @param {CreatePermissionsRoleAdminDto} createPermissionsRoleAdminDto Data for creating the admin permissions role.
   * @returns {HttpResponse} HTTP response with details of created admin permissions role.
   */
  @ApiOperation({ summary: 'Assigning permissions to roles' })
  @ApiCustomResponse(HttpStatus.CREATED, Messages.CREATED_PERMISSIONS_ROLE_SUCCESSFULLY[language.code], 'PermissionsRoleAdmin')
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createPermissionsRole(@Body(new ValidationPipe()) createPermissionsRoleAdminDto: CreatePermissionsRolesAdminDto) {
    try {
      const data = await this.permissionsRolesAdminService.create(createPermissionsRoleAdminDto)
      return HttpResponse.created(data, Messages.CREATED_PERMISSIONS_ROLE_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Create permissions role by block.
   * @param {CreatePermissionsRoleAdminDto} createPermissionsRoleAdminDto Data for creating the admin permissions role.
   * @returns {HttpResponse} HTTP response with details of created admin permissions role.
   */
  @ApiOperation({ summary: 'Assigning permissions to roles' })
  @ApiCustomResponse(HttpStatus.CREATED, Messages.CREATED_PERMISSIONS_ROLE_SUCCESSFULLY[language.code], 'PermissionsRoleAdmin')
  @UseGuards(JwtAuthGuard)
  @Post('create/block/:idrole_admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({
    description: 'Body',
    type: BlockPermissionsRolesAdminDto,
    examples: {
      'Data Body': {
        value: [
          {
            idpermission_admin: 1,
            status: true,
          },
        ],
      },
    },
  })
  async createPermissionsRoleBlock(@Body(new ValidationPipe()) blockPermissionsRolesAdminDto: BlockPermissionsRolesAdminDto[], @Param('idrole_admin') idRoleAdmin: number) {
    try {
      const data = await this.permissionsRolesAdminService.createInBlock(blockPermissionsRolesAdminDto, idRoleAdmin)
      return HttpResponse.created(data, Messages.CREATED_PERMISSIONS_ROLE_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Handles the request to get permissions assigned to a role by ID.
   * @param {number} id The ID of the role.
   * @returns {HttpResponse} HTTP response with details of permissions assigned to the role.
   */
  @ApiOperation({ summary: 'Getting permissions assigned to a role by id' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_PERMISSIONS_ASSIGNED_TO_ROLE[language.code], 'PermissionsRoleAdmin')
  @UseGuards(JwtAuthGuard)
  @Get(':idrole_admin/permissions')
  async getPermissionsAssignedToRole(@Param('idrole_admin') idRoleAdmin: number) {
    try {
      const data = await this.permissionsRolesAdminService.getByIdRoleAdmin(idRoleAdmin)
      return HttpResponse.success(data, Messages.GET_PERMISSIONS_ASSIGNED_TO_ROLE[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
  /**
   * Handles the request to delete permissions assigned to a role by ID.
   * @param {number} idrole_admin The ID of the role.
   * @returns {HttpResponse} HTTP response indicating success or failure of the operation.
   */
  @ApiOperation({ summary: 'Deleting permissions assigned to a role by id' })
  @ApiCustomResponse(HttpStatus.OK, Messages.DELETE_PERMISSIONS_ASSIGNED_TO_ROLE_SUCCESS[language.code], 'PermissionsRoleAdmin')
  @UseGuards(JwtAuthGuard)
  @Delete(':idpermission_role_admin')
  async deletePermissionsAssignedToRole(@Param('idpermission_role_admin') idPermissionRoleAdmin: number) {
    try {
      await this.permissionsRolesAdminService.delete(idPermissionRoleAdmin)
      return HttpResponse.success(null, Messages.DELETE_PERMISSIONS_ASSIGNED_TO_ROLE_SUCCESS[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
