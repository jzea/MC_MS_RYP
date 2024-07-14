import { Controller, Body, Get, UseGuards, Put, HttpStatus, Param, Post, HttpCode, Request, Patch, Query } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import { HttpResponse } from 'src/response/http.response'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ApiCustomResponse } from 'src/decorators/api-custom-response.decorator'
import { LoginUserDto } from 'src/users/dto/login-user.dto'
import { UpdatePasswordDto } from 'src/users/dto/update-password.dto'
import { User } from 'src/users/user.model'
import { UsersService } from 'src/users/users.service'
import { UpdateUserDto } from 'src/users/dto/update-user.dto'
import { UpdateActiveDto } from 'src/users/dto/update-active.dto'
import { CreateSellerDto } from 'src/sellers/dto/create-seller.dto'
import { SellersService } from 'src/sellers/sellers.service'
import { UpdateApprovedDto } from 'src/sellers/dto/update-approved.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'

import { CreateUserAdminDto } from './dto/create-users-admin.dto'
import { UpdateUsersAdminDto } from './dto/update-users-admin.dto'
import { UserAdmin } from './users-admin.model'
import { UsersAdminService } from './users-admin.service'

/**
 * Controller for operations related to admin users.
 */
@ApiBearerAuth()
@ApiTags('Admin Users')
@ApiExtraModels(UserAdmin)
@ApiExtraModels(User)
@Controller('admin/users')
export class UsersAdminController {
  constructor(private usersAdminService: UsersAdminService, private userService: UsersService, private sellersService: SellersService) {}

  /**
   * Handles the login request for an admin user.
   * @param {LoginUserDto} userDto The user data for login.
   * @returns {HttpResponse} HTTP response with login details.
   */
  @ApiOperation({ summary: 'User authorization' })
  @ApiCustomResponse(HttpStatus.OK, Messages.LOGGED_IN_SUCCESSFULLY[language.code], 'UserAdmin')
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ValidationPipe()) userDto: LoginUserDto) {
    try {
      const data = await this.usersAdminService.login(userDto)
      return HttpResponse.success(data, Messages.LOGGED_IN_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Handles the registration request for a new admin user.
   * @param {CreateUserAdminDto} createUserAdminDto The user data to register.
   * @returns {HttpResponse} HTTP response with details of registered user.
   */
  @ApiOperation({ summary: 'User registration' })
  @ApiCustomResponse(HttpStatus.OK, Messages.REGISTERED_SUCCESSFULLY[language.code], 'UserAdmin')
  @Post('/registration')
  @HttpCode(HttpStatus.OK)
  async registration(@Body(new ValidationPipe()) createUserAdminDto: CreateUserAdminDto) {
    try {
      const data = await this.usersAdminService.create(createUserAdminDto)
      return HttpResponse.success(data, Messages.REGISTERED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Handles the request to get all admin users.
   * @returns {HttpResponse} HTTP response with admin users.
   */
  @ApiOperation({ summary: 'Getting all admin users' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_ALL_ADMIN_USERS[language.code], 'UserAdmin', '', true)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    try {
      const data = await this.usersAdminService.getAll()
      return HttpResponse.success(data, Messages.GET_ALL_ADMIN_USERS[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Retrieves all users.
   * @returns Response containing the list of users.
   */
  @ApiOperation({ summary: 'Getting all users app' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_ALL_USERS[language.code], 'User', '', true)
  @UseGuards(JwtAuthGuard)
  @Get('app/movil')
  @ApiQuery({ name: 'searchTerm', required: false })
  @ApiQuery({ name: 'userType', required: false })
  async getAllUser(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10, @Query('searchTerm') searchTerm: string = null, @Query('userType') userType: number = null) {
    try {
      if (searchTerm === 'null' || !searchTerm) {
        searchTerm = null
        console.log(searchTerm)
      }
      const offset = (page - 1) * pageSize
      const data = await this.userService.getAllToAdmin(offset, pageSize, searchTerm, userType)
      return HttpResponse.success(data, Messages.GET_ALL_USERS[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Retrieves a user detail by their id.
   * @param req HTTP request object.
   * @returns Response containing the user data.
   */
  @ApiOperation({ summary: 'Getting a user detail by iduser' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_USER_BY_ID[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Get('app/movil/:iduser')
  async getUserDetail(@Param('iduser') idUser: number) {
    try {
      const data = await this.userService.getUserDetail(idUser)
      return HttpResponse.success(data, Messages.GET_USER_BY_ID[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates a user  by their id.
   * @param req HTTP request object.
   * @param idUser The ID of the user to update.
   * @param userData The updated user data.
   * @returns Response containing the updated user data.
   */
  @ApiOperation({ summary: 'Updating a user  by iduser' })
  @ApiCustomResponse(HttpStatus.OK, Messages.USER_UPDATED[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Put('app/movil/:iduser')
  async updateUserDetail(@Body() updateUserDto: UpdateUserDto, @Param('iduser') iduser: number) {
    try {
      const data = await this.userService.updateUserFromAdmin(iduser, updateUserDto)
      return HttpResponse.success(data, Messages.USER_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates the 'active' property for a user.
   * @param active New value for the 'active' property.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Update User Active Property' })
  @ApiCustomResponse(HttpStatus.OK, Messages.ACTIVE_PROPERTY_UPDATED[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Patch('app/movil/:iduser')
  async updateActiveProperty(@Body(new ValidationPipe()) updateActiveDto: UpdateActiveDto, @Param('iduser') idUser: number) {
    try {
      const data = await this.userService.updateActive(idUser, updateActiveDto.active)
      return HttpResponse.success(data, Messages.ACTIVE_PROPERTY_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates seller information.
   * @param createSellerDto Data required for updating the seller.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Update seller by iduser' })
  @ApiCustomResponse(HttpStatus.OK, Messages.SUCCESSFULLY_UPDATED[language.code], 'Seller')
  @UseGuards(JwtAuthGuard)
  @Put('app/movil/seller/:iduser')
  @HttpCode(HttpStatus.OK)
  async update(@Body(new ValidationPipe()) createSellerDto: CreateSellerDto, @Param('iduser') idUser: number) {
    try {
      const data = await this.sellersService.updateByAdmin(idUser, createSellerDto)
      return HttpResponse.success(data, Messages.SUCCESSFULLY_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates the 'approved' property for a seller.
   * @param approved New value for the 'approved' property.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Update Seller approved Property' })
  @ApiCustomResponse(HttpStatus.OK, Messages.SUCCESSFULLY_UPDATED[language.code], 'Seller')
  @UseGuards(JwtAuthGuard)
  @Patch('app/movil/seller/:iduser')
  @HttpCode(HttpStatus.OK)
  async updateSellerApproved(@Body(new ValidationPipe()) updateApprovedDto: UpdateApprovedDto, @Param('iduser') idUser: number) {
    try {
      const data = await this.sellersService.updateApproved(idUser, updateApprovedDto.approved)
      return HttpResponse.success(data, Messages.SUCCESSFULLY_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Handles the request to get an admin user by ID.
   * @param {number} id The ID of the admin user.
   * @returns {HttpResponse} HTTP response with details of admin user.
   */
  @ApiOperation({ summary: 'Getting an admin user by id' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_ADMIN_USER_BY_ID[language.code], 'UserAdmin')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      const data = await this.usersAdminService.getById(id)
      return HttpResponse.success(data, Messages.GET_ADMIN_USER_BY_ID[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Handles the request to update an admin user.
   * @param {number} id The ID of the admin user to update.
   * @param {UpdateUsersAdminDto} updateUserAdminDto The updated data of the admin user.
   * @returns {HttpResponse} HTTP response with details of updated admin user.
   */
  @ApiOperation({ summary: 'Updating an admin user' })
  @ApiCustomResponse(HttpStatus.OK, Messages.ADMIN_USER_UPDATED[language.code], 'UserAdmin')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserAdminDto: UpdateUsersAdminDto) {
    try {
      const data = await this.usersAdminService.update(id, updateUserAdminDto)
      return HttpResponse.success(data, Messages.ADMIN_USER_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates a user's admin password.
   * @param dto Data required for updating the password.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Update password admin' })
  @ApiCustomResponse(HttpStatus.OK, Messages.PASSWORD_UPDATED[language.code], 'UserAdmin')
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async updatePassword(@Body() dto: UpdatePasswordDto, @Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.usersAdminService.updatePassword(idUser, dto)
      return HttpResponse.success(data, Messages.PASSWORD_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
