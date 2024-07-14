import { Controller, Post, Body, Request, ValidationPipe, HttpStatus, HttpCode, Put, UseGuards, Get, BadRequestException, Delete } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import { Sequelize } from 'sequelize-typescript'

import { HttpResponse } from '../response/http.response'
import { ApiCustomResponse } from '../decorators/api-custom-response.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { runInTransaction } from '../utils/transaction.util'

import { SellersService } from './sellers.service'
import { CreateSellerDto } from './dto/create-seller.dto'
import { Seller } from './seller.model'

/**
 * Controller responsible for handling requests related to sellers.
 */
@ApiBearerAuth()
@ApiTags('Sellers')
@Controller('sellers')
@ApiExtraModels(Seller)
export class SellersController {
  constructor(private readonly sellersService: SellersService, private readonly sequelize: Sequelize) {}

  /**
   * Registers a new seller.
   * @param createSellerDto Data required for creating a new seller.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the registration attempt.
   */
  @ApiOperation({ summary: 'Registration' })
  @ApiCustomResponse(HttpStatus.CREATED, Messages.SUCCESSFULLY_REGISTERED[language.code], 'Seller')
  @UseGuards(JwtAuthGuard)
  @Post('')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) createSellerDto: CreateSellerDto, @Request() req) {
    try {
      const idUser = req.user.id
      const data = await runInTransaction(this.sequelize, async (transaction) => {
        return await this.sellersService.create(idUser, createSellerDto, transaction)
      })
      return HttpResponse.created(data, Messages.SUCCESSFULLY_REGISTERED[language.code])
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
  @ApiOperation({ summary: 'Update' })
  @ApiCustomResponse(HttpStatus.OK, Messages.SUCCESSFULLY_UPDATED[language.code], 'Seller')
  @UseGuards(JwtAuthGuard)
  @Put('')
  @HttpCode(HttpStatus.OK)
  async update(@Body(new ValidationPipe()) createSellerDto: CreateSellerDto, @Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.sellersService.update(idUser, createSellerDto)
      return HttpResponse.success(data, Messages.SUCCESSFULLY_UPDATED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Retrieves seller data for the authenticated user.
   * @param req HTTP request object.
   * @returns Response containing the seller data.
   */
  @ApiOperation({ summary: 'Get seller data for the user' })
  @ApiCustomResponse(HttpStatus.OK, Messages.LISTED_SUCCESSFULLY[language.code], 'Seller')
  @UseGuards(JwtAuthGuard)
  @Get('')
  async getById(@Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.sellersService.getSellerByUser(idUser)
      if (data == null) {
        throw new BadRequestException(Messages.NO_SELLER_DATA_FOUND[language.code])
      }
      return HttpResponse.success(data, Messages.LISTED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Deletes seller data for the authenticated user.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the deletion attempt.
   */
  @ApiOperation({ summary: 'Delete seller by iduser' })
  @ApiCustomResponse(HttpStatus.OK, Messages.SELLER_DELETED[language.code], 'Seller')
  @UseGuards(JwtAuthGuard)
  @Delete('')
  @HttpCode(HttpStatus.OK)
  async deleteUserByEmail(@Request() req) {
    try {
      const idUser = req.user.id
      const data = await this.sellersService.deleteByUser(idUser)
      return HttpResponse.success(data, Messages.SELLER_DELETED[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
