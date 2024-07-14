import { Controller, Body, Get, UseGuards, Put, HttpStatus, Request, HttpCode, ValidationPipe, Delete, Patch, Param } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'

import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { ApiCustomResponse } from '../decorators/api-custom-response.decorator'
import { HttpResponse } from '../response/http.response'

import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { DeleteUserDto } from './dto/delete-user'
import { UpdatePasswordDto } from './dto/update-password.dto'

/**
 * Controller responsible for handling requests related to users.
 */
@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * Retrieves all users.
   * @returns Response containing the list of users.
   */
  @ApiOperation({ summary: 'Getting all users' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_ALL_USERS[language.code], 'User', '', true)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    try {
      const data = await this.usersService.getAllUsers()
      return HttpResponse.success(data, Messages.GET_ALL_USERS[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Retrieves a user by their id.
   * @param req HTTP request object.
   * @returns Response containing the user data.
   */
  @ApiOperation({ summary: 'Getting a user by iduser' })
  @ApiCustomResponse(HttpStatus.OK, Messages.GET_USER_BY_ID[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Get('iduser')
  async getById(@Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.usersService.getById(idUser)
      return HttpResponse.success(data, Messages.GET_USER_BY_ID[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates a user's password.
   * @param dto Data required for updating the password.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Update password' })
  @ApiCustomResponse(HttpStatus.OK, Messages.PASSWORD_UPDATED[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Patch('password')
  async updatePassword(@Body() dto: UpdatePasswordDto, @Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.usersService.updatePassword(idUser, dto)
      return HttpResponse.success(data, Messages.PASSWORD_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates a user's information.
   * @param updateUserDto Data required for updating the user.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Updating a user by iduser' })
  @ApiCustomResponse(HttpStatus.OK, Messages.USER_UPDATED[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Put()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.usersService.updateUser(idUser, updateUserDto)
      return HttpResponse.success(data, Messages.USER_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates a user's information by their id.
   * @param updateUserDto Data required for updating the user.
   * @param iduser ID of the user to be updated.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Updating a user by iduser' })
  @ApiCustomResponse(HttpStatus.OK, Messages.USER_UPDATED[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Put(':iduser')
  async updateUserByIduser(@Body() updateUserDto: UpdateUserDto, @Param('iduser') iduser: number) {
    try {
      const data = await this.usersService.updateUser(iduser, updateUserDto)
      return HttpResponse.success(data, Messages.USER_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Deletes a user.
   * @param dto Data required for deleting the user.
   * @returns Response indicating success or failure of the deletion attempt.
   */
  @ApiOperation({ summary: 'Delete user' })
  @ApiCustomResponse(HttpStatus.OK, Messages.USER_DELETED[language.code], 'User')
  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Body(new ValidationPipe()) dto: DeleteUserDto) {
    try {
      const data = await this.usersService.deleteUser(dto)
      return HttpResponse.success(data, Messages.USER_DELETED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Deletes a user by their email.
   * @param email Email of the user to be deleted.
   * @returns Response indicating success or failure of the deletion attempt.
   */
  @ApiOperation({ summary: 'Delete user by email' })
  @ApiCustomResponse(HttpStatus.OK, Messages.USER_DELETED[language.code], 'User')
  @Delete(':email')
  @HttpCode(HttpStatus.OK)
  async deleteUserByEmail(@Param('email') email: string) {
    try {
      const data = await this.usersService.deleteUserByEmail(email)
      return HttpResponse.success(data, Messages.USER_DELETED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates the FCM token for a user.
   * @param tokenFcm New FCM token.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Update Token fcm' })
  @ApiCustomResponse(HttpStatus.OK, Messages.TOKEN_FCM_UPDATED[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Patch(':token_fcm')
  async updateTokenFcm(@Param('token_fcm') tokenFcm: string, @Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.usersService.updateTokenFcm(idUser, tokenFcm)
      return HttpResponse.success(data, Messages.TOKEN_FCM_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates the lang property for a user.
   * @param lang New language code.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Update User Language' })
  @ApiCustomResponse(HttpStatus.OK, Messages.LANGUAGE_UPDATED[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Patch('language/:lang')
  async updateLanguage(@Param('lang') lang: string, @Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.usersService.updateLang(idUser, lang)
      return HttpResponse.success(data, Messages.LANGUAGE_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Verifies if the user has completed their profile.
   * @param userId User ID to verify profile completion.
   * @returns Response indicating whether the user has completed their profile or not.
   */
  @ApiOperation({ summary: 'Verify if the user has completed their profile' })
  @ApiCustomResponse(HttpStatus.OK, Messages.LISTED_SUCCESSFULLY[language.code], 'VerifyProfileCompletionDto')
  @UseGuards(JwtAuthGuard)
  @Get('verify-profile-complete')
  @HttpCode(HttpStatus.OK)
  async verifyProfileCompletion(@Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.usersService.verifyCompleteProfile(idUser)
      return HttpResponse.success(data, Messages.LISTED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Updates the file_documents property for a user.
   * @param fileDocuments New file documents data.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the update attempt.
   */
  @ApiOperation({ summary: 'Update User File Documents' })
  @ApiCustomResponse(HttpStatus.OK, Messages.UPDATED_SUCCESSFULLY[language.code], 'User')
  @UseGuards(JwtAuthGuard)
  @Patch('file-documents/:file_documents')
  async updateFileDocuments(@Param('file_documents') fileDocuments: number, @Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.usersService.updateFileDocuments(idUser, fileDocuments)
      return HttpResponse.success(data, Messages.UPDATED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
