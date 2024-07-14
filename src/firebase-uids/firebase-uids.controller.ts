import { Controller, HttpStatus, Post, UseGuards, Request, Body, Delete, HttpCode, ValidationPipe, Get } from '@nestjs/common'
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from '@nestjs/swagger'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'

import { ApiCustomResponse } from '../decorators/api-custom-response.decorator'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { HttpResponse } from '../response/http.response'

import { FirebaseUidsService } from './firebase-uids.service'
import { CreateFirebaseUidDto } from './dto/create-firebase-uid.dto'
import { FirebaseUid } from './firebase-uid.model'
import { DeleteFirebaseUidDto } from './dto/delete-firebase-uid.dto'

/**
 * Controller responsible for handling requests related to Firebase UIDs.
 */
@ApiBearerAuth()
@ApiTags('Firebase Uids')
@Controller('firebase-uids')
@ApiExtraModels(FirebaseUid)
export class FirebaseUidsController {
  constructor(private readonly firebaseUidsService: FirebaseUidsService) {}

  /**
   * Retrieves all Firebase UIDs associated with the currently authenticated user.
   * @param req HTTP request object.
   * @returns Response containing the list of Firebase UIDs.
   */
  @ApiOperation({ summary: 'Getting all Firebase UIDs' })
  @ApiCustomResponse(HttpStatus.OK, Messages.LISTED_SUCCESSFULLY[language.code], 'FirebaseUid', '', true)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() req) {
    try {
      const userId = req.user.id
      const data = await this.firebaseUidsService.getAllByIdUser(userId)
      return HttpResponse.success(data, Messages.LISTED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Registers a new Firebase UID for the currently authenticated user.
   * @param dto Firebase UID data to be registered.
   * @param req HTTP request object.
   * @returns Response indicating success or failure of the registration attempt.
   */
  @ApiOperation({ summary: 'Firebase UID Registration' })
  @ApiCustomResponse(HttpStatus.CREATED, Messages.FIREBASE_UID_REGISTERED_SUCCESSFULLY[language.code], 'FirebaseUid')
  @UseGuards(JwtAuthGuard)
  @Post()
  async updatePassword(@Body() dto: CreateFirebaseUidDto, @Request() req) {
    try {
      const userId = req.user.id
      const data = await this.firebaseUidsService.create({ ...dto, iduser: userId })
      return HttpResponse.created(data, Messages.FIREBASE_UID_REGISTERED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }

  /**
   * Deletes a Firebase UID.
   * @param dto Data required for deleting the Firebase UID.
   * @returns Response indicating success or failure of the deletion attempt.
   */
  @ApiOperation({ summary: 'Delete Firebase UID' })
  @ApiCustomResponse(HttpStatus.OK, Messages.DELETED_SUCCESSFULLY[language.code], 'FirebaseUid')
  @Delete()
  @HttpCode(HttpStatus.OK)
  async registration(@Body(new ValidationPipe()) dto: DeleteFirebaseUidDto) {
    try {
      const data = await this.firebaseUidsService.deleteByFirebaseUid(dto.uid_firebase)
      return HttpResponse.success(data, Messages.DELETED_SUCCESSFULLY[language.code])
    } catch (error) {
      return error.response ? error.response : HttpResponse.error(error.toString())
    }
  }
}
