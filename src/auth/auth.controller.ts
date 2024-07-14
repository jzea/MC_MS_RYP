import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request, UseGuards, ValidationPipe } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import { Sequelize } from 'sequelize-typescript'

import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/user.model'
import { LoginUserDto } from '../users/dto/login-user.dto'
import { VerifyUserDto } from '../users/dto/verify-user.dto'
import { HttpResponse } from '../response/http.response'
import { ApiCustomResponse } from '../decorators/api-custom-response.decorator'

import { AuthService } from './auth.service'
import { JwtAuthGuard } from './jwt-auth.guard'
import { VerifyAprovedSellerDto } from './types/verifyUser'
/**
 * Controller responsible for handling authorization-related requests.
 */
@ApiTags('Authorization')
@Controller('')
@ApiExtraModels(User)
@ApiExtraModels(VerifyAprovedSellerDto)
export class AuthController {
  constructor(private authService: AuthService, private readonly sequelize: Sequelize) {}

  /**
   * Handles user login.
   * @param userDto Login credentials.
   * @returns Response indicating success or failure of the login attempt.
   */
  @ApiOperation({ summary: 'User authorization' })
  @ApiCustomResponse(HttpStatus.OK, Messages.LOGGED_IN_SUCCESSFULLY[language.code], 'User')
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body(new ValidationPipe()) userDto: LoginUserDto) {
    try {
      const data = await this.authService.login(userDto)
      return HttpResponse.success(data, Messages.LOGGED_IN_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Handles user registration.
   * @param userDto User registration data.
   * @returns Response indicating success or failure of the registration attempt.
   */
  @ApiOperation({ summary: 'User registration' })
  @ApiCustomResponse(HttpStatus.OK, Messages.REGISTERED_SUCCESSFULLY[language.code], 'User')
  @Post('/registration')
  @HttpCode(HttpStatus.OK)
  async registration(@Body(new ValidationPipe()) userDto: CreateUserDto) {
    try {
      if (userDto.lang == null) {
        userDto.lang = 'es'
      }
      const data = await this.authService.registration(userDto)
      return HttpResponse.success(data, Messages.REGISTERED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Checks if the provided email or phone number exists.
   * @param userDto User data to verify.
   * @returns Response indicating whether the email or phone number exists or not.
   */
  @ApiOperation({ summary: 'Check if email or phone number does not exist' })
  @ApiCustomResponse(HttpStatus.OK, Messages.EMAIL_PHONE_NOT_REGISTERED[language.code], 'VerifyUserDto')
  @Post('/verify-phone-email')
  @HttpCode(HttpStatus.OK)
  async findByEmailOrPhoneNumber(@Body(new ValidationPipe()) userDto: VerifyUserDto) {
    const data = await this.authService.findByEmailOrPhoneNumber(userDto)
    return HttpResponse.success(data, Messages.EMAIL_PHONE_NOT_REGISTERED[language.code])
  }

  /**
   * Checks if the user is a seller and approved.
   * @param req HTTP request object.
   * @returns Response indicating whether the user is a seller and approved or not.
   */
  @ApiOperation({ summary: 'Check if the user is a seller and approved' })
  @ApiCustomResponse(HttpStatus.OK, Messages.USER_IS_SELLER_APPROVED[language.code], 'VerifyAprovedSellerDto')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('verify-seller/iduser')
  @HttpCode(HttpStatus.OK)
  async verifyUser(@Request() req) {
    try {
      const idUser = req.user.id
      const isApproved = await this.authService.isApprovedSeller(idUser)
      const message = isApproved.isApprovedSeller ? Messages.USER_IS_SELLER_APPROVED[language.code] : Messages.USER_NOT_SELLER_OR_NOT_APPROVED[language.code]
      return HttpResponse.success(isApproved, message)
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Checks if email or phone number exists.
   * @param userDto User data to verify.
   * @returns Response indicating whether the email or phone number exists or not.
   */
  @ApiOperation({ summary: 'Check if email or phone number exists' })
  @ApiCustomResponse(HttpStatus.OK, Messages.DATA_FOUND[language.code], 'VerifyUserDto')
  @Post('/verify-phone-email-indb')
  @HttpCode(HttpStatus.OK)
  async findByEmailOrPhoneNumberV2(@Body(new ValidationPipe()) userDto: VerifyUserDto) {
    try {
      const data = await this.authService.findByEmailOrPhoneNumberV2(userDto)
      return HttpResponse.success(data, Messages.DATA_FOUND[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * User login by Firebase UID.
   * @param uidFirebase Firebase UID of the user.
   * @returns Response indicating success or failure of the login attempt.
   */
  @ApiOperation({ summary: 'User login by Firebase UID' })
  @ApiCustomResponse(HttpStatus.OK, Messages.SESSION_STARTED_SUCCESSFULLY[language.code], 'User')
  @Get('/login-uid-firebase/:uid_firebase')
  @HttpCode(HttpStatus.OK)
  async loginUidFirebase(@Param('uid_firebase') uidFirebase: string) {
    try {
      const data = await this.authService.loginUidFirebase(uidFirebase)
      return HttpResponse.success(data, Messages.SESSION_STARTED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Checks if number and email belong to the user.
   * @param phonenumber Phone number to verify.
   * @param email Email to verify.
   * @returns Response indicating whether the number and email belong to the user or not.
   */
  @ApiOperation({ summary: 'Check if number and email belong to the user' })
  @ApiCustomResponse(HttpStatus.OK, Messages.USER_IS_SELLER_APPROVED[language.code], 'VerifyAprovedSellerDto')
  @Get('number-email-belong-user')
  @HttpCode(HttpStatus.OK)
  async verifyNumberAndEmail(@Query('phonenumber') phonenumber: string, @Query('email') email: string) {
    try {
      const data = await this.authService.verifyNumberAndEmail(phonenumber, email)
      const message = data.match === false ? Messages.DATA_NOT_MATCH[language.code] : Messages.DATA_FOUND[language.code]
      return HttpResponse.success(data, message)
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
