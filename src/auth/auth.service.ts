import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { CountriesService } from 'src/address/countries/countries.service'
import { language } from 'src/main'
import { Messages } from 'src/utils/messages.enum'
import { VirtualWalletService } from 'src/virtual-wallet/virtual-wallet.service'
import { CreateVirtualWalletDto } from 'src/virtual-wallet/dto/create-virtual-wallet.dto'

import { CreateUserDto } from '../users/dto/create-user.dto'
import { UsersService } from '../users/users.service'
import { User } from '../users/user.model'
import { FirebaseUidsService } from '../firebase-uids/firebase-uids.service'
import { CreateFirebaseUidDto } from '../firebase-uids/dto/create-firebase-uid.dto'
import { LoginUserDto } from '../users/dto/login-user.dto'
import { VerifyUserDto } from '../users/dto/verify-user.dto'

import { NotificationService } from './notifications.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private firebaseUidsService: FirebaseUidsService,
    private jwtService: JwtService,
    private countryService: CountriesService,
    private notificationService: NotificationService,
    private virtualWalletService: VirtualWalletService,
  ) {}

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto)
    const token = await this.generateToken(user)
    return { user, token }
  }

  async loginUidFirebase(uidFirebase) {
    const dataUidFirebase = await this.firebaseUidsService.getByUidFirebase(uidFirebase)
    if (dataUidFirebase == null) {
      throw new BadRequestException(Messages.FIREBASE_UID_NOT_EXIST[language.code])
    }
    const user = await this.userService.getById(dataUidFirebase.iduser)
    const token = await this.generateToken(user)
    return { user, token }
  }

  async registration(userDto: CreateUserDto) {
    if (userDto.email) {
      const userEmail = await this.userService.getUserByEmail(userDto.email)
      if (userEmail) {
        throw new BadRequestException(Messages.EMAIL_ALREADY_IN_USE[language.code])
      }
    }

    if (userDto.phone_number) {
      const userPhoneNumber = await this.userService.getUserByPhoneNumber(userDto.phone_number)
      if (userPhoneNumber) {
        throw new BadRequestException(Messages.PHONE_NUMBER_ALREADY_IN_USE[language.code])
      }
    }

    let hashPassword
    if (userDto.password) {
      hashPassword = await bcrypt.hash(userDto.password, 10)
    }

    let idcountry = null
    if (userDto.country) {
      const country = await this.countryService.findByName(userDto.country.toLowerCase())
      if (country) idcountry = country.idcountry
    }

    if (userDto.token_fcm) {
      await this.userService.updateDuplicTokenFcm(userDto.token_fcm)
    }

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
      idcountry: idcountry,
      active: true,
    })

    const userUpdate = await this.userService.generateUsername(user.iduser)

    const token = await this.generateToken(user)
    if (userDto.uid_firebase) {
      const createFirebaseUidDto: CreateFirebaseUidDto = {
        uid_firebase: userDto.uid_firebase,
        iduser: user.iduser,
        uid_reference: userDto.uid_reference,
      }
      await this.firebaseUidsService.create(createFirebaseUidDto)
    }
    const createVirtualWalletDto = new CreateVirtualWalletDto()
    createVirtualWalletDto.iduser = user.iduser

    this.virtualWalletService.create(createVirtualWalletDto)

    this.notificationService.welcomeUser(user.iduser)
    return { userUpdate, token }
  }

  async findByEmailOrPhoneNumber(userDto: VerifyUserDto) {
    let property = false
    if (userDto.email) {
      const userEmail = await this.userService.getUserByEmail(userDto.email)
      if (userEmail) {
        throw new BadRequestException(Messages.EMAIL_ALREADY_IN_USE[language.code])
      }
      property = true
    }

    if (userDto.phone_number) {
      const userPhoneNumber = await this.userService.getUserByPhoneNumber(userDto.phone_number)
      if (userPhoneNumber) {
        throw new BadRequestException(Messages.PHONE_NUMBER_ALREADY_IN_USE[language.code])
      }
      property = true
    }

    if (!property) {
      throw new BadRequestException(Messages.EMAIL_OR_PHONE_REQUIRED[language.code])
    }

    return {
      success: true,
      message: Messages.EMAIL_OR_PHONE_NOT_REGISTERED[language.code],
    }
  }

  async findByEmailOrPhoneNumberV2(userDto: VerifyUserDto) {
    let property = false
    if (userDto.email) {
      const userEmail = await this.userService.getUserByEmail(userDto.email)
      if (userEmail) {
        return {
          success: true,
          message: Messages.EMAIL_ALREADY_REGISTERED[language.code],
        }
      }
      property = true
    }

    if (userDto.phone_number) {
      const userPhoneNumber = await this.userService.getUserByPhoneNumber(userDto.phone_number)
      if (userPhoneNumber) {
        return {
          success: true,
          message: Messages.PHONE_NUMBER_ALREADY_REGISTERED[language.code],
        }
      }
      property = true
    }

    if (!property) {
      throw new BadRequestException(Messages.ENTER_EMAIL_OR_PHONE[language.code])
    }

    throw new BadRequestException(Messages.EMAIL_OR_PHONE_NOT_REGISTERED[language.code])
  }

  async isApprovedSeller(userId: number) {
    const user = await this.userService.getById(userId)

    if (!user) {
      throw new BadRequestException(Messages.USER_NOT_FOUND[language.code])
    }
    const isUserSeller = user.user_type === 2

    const isUserApproved = user.approved

    const isApprovedSeller = user.user_type === 2 && user.approved

    return {
      isApprovedSeller,
      isUserSeller,
      isUserApproved,
      user_type: user.user_type,
    }
  }

  async generateToken(user: User) {
    const payload = { email: user.email, id: user.iduser }
    return this.jwtService.sign(payload)
  }

  private async validateUser(userDto: LoginUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email)
    if (!candidate) {
      throw new BadRequestException(Messages.EMAIL_NOT_REGISTERED[language.code])
    }
    const isPassCorrect = await bcrypt.compare(userDto.password, candidate.password || '')
    if (candidate && isPassCorrect) {
      return candidate
    }
    const firebaseUids = await this.firebaseUidsService.getOneByIdUser(candidate.iduser)
    if (firebaseUids) {
      throw new BadRequestException(Messages.INVALID_PASSWORD_WITH_AUTH_METHOD(firebaseUids.uid_reference)[language.code])
    }

    throw new BadRequestException(Messages.INCORRECT_PASSWORD[language.code])
  }
  async verifyNumberAndEmail(phoneNumber: string, email: string) {
    const data = await this.userService.verifyNumberAndEmail(phoneNumber, email)
    const match = data ? true : false
    const uid_reference = data?.firebase_uid?.uid_reference || null
    return { match, uid_reference }
  }
}
