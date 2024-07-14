import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'
import { Transaction } from 'sequelize'

import { Address } from './address.model'
import { CreateAddressDto } from './dto/create-address.dto'

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address) private addressRepository: typeof Address) {}

  async create(createAddressDto: CreateAddressDto, transaction: Transaction) {
    return await this.addressRepository.create(createAddressDto, { transaction })
  }

  async update(id: number, dto: CreateAddressDto) {
    const address = await this.getById(id)
    if (!address) {
      throw new BadRequestException(Messages.ADDRESS_NOT_FOUND[language.code])
    }
    address.postal_code = dto.postal_code || address.postal_code
    address.address = dto.address || address.address
    address.main_address = dto.main_address || address.main_address
    address.idcity = dto.idcity || address.idcity

    await address.save()
    return address
  }

  async getById(id) {
    return await this.addressRepository.findOne({ where: { idaddress: id } })
  }

  async getAddressReception(idUser: number) {
    return await this.addressRepository.findOne({ where: { iduser: idUser, type_address: 11 } })
  }
}
