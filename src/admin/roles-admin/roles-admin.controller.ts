import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, ValidationPipe, Request, Put, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ApiCustomResponse } from 'src/decorators/api-custom-response.decorator'
import { language } from 'src/main'
import { Messages } from 'src/utils/messages.enum'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { HttpResponse } from 'src/response/http.response'

import { RolesAdminService } from './roles-admin.service'
import { RoleAdmin } from './roles-admin.model'
import { CreateRoleAdminDto } from './dto/create-roles-admin.dto'
import { UpdateRolesAdminDto } from './dto/update-roles-admin.dto'

@ApiBearerAuth()
@ApiTags('Roles admin')
@ApiExtraModels(RoleAdmin)
@Controller('admin/roles')
export class RolesAdminController {
  constructor(private readonly rolesAdminService: RolesAdminService) {}

  /**
   * Handles the request to get all admin roles.
   * @returns {HttpResponse} HTTP response with admin roles.
   */
  @ApiOperation({ summary: 'Getting all admin roles' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_ALL_ADMIN_ROLES[language.code], 'RoleAdmin', '', true)
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllRoles() {
    try {
      const data = await this.rolesAdminService.getAll()
      return HttpResponse.success(data, Messages.GET_ALL_ADMIN_ROLES[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Create a new admin role.
   * @param {CreateRoleAdminDto} createRoleAdminDto Data for creating the admin role.
   * @returns {HttpResponse} HTTP response with details of created admin role.
   */
  @ApiOperation({ summary: 'Role creation' })
  @ApiCustomResponse(HttpStatus.CREATED, Messages.CREATED_SUCCESSFULLY[language.code], 'RoleAdmin')
  @UseGuards(JwtAuthGuard)
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body(new ValidationPipe()) createRoleAdminDto: CreateRoleAdminDto, @Request() req) {
    try {
      createRoleAdminDto.iduser_creator = req.user.id
      createRoleAdminDto.active = true
      const data = await this.rolesAdminService.create(createRoleAdminDto)
      return HttpResponse.created(data, Messages.CREATED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Handles the request to update an admin role.
   * @param {number} id The ID of the admin role to update.
   * @param {UpdateRoleAdminDto} updateRoleAdminDto The updated data of the admin role.
   * @returns {HttpResponse} HTTP response with details of updated admin role.
   */
  @ApiOperation({ summary: 'Updating an admin role' })
  @ApiCustomResponse(HttpStatus.OK, Messages.ADMIN_ROLE_UPDATED[language.code], 'RoleAdmin')
  @UseGuards(JwtAuthGuard)
  @Put('/update/:idrole_admin')
  async updateRole(@Param('idrole_admin') idRoleAdmin: number, @Body() updateRoleAdminDto: UpdateRolesAdminDto) {
    try {
      const data = await this.rolesAdminService.update(idRoleAdmin, updateRoleAdminDto)
      return HttpResponse.success(data, Messages.ADMIN_ROLE_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
