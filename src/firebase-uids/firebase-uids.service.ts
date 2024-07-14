import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Transaction } from 'sequelize'

import { CreateFirebaseUidDto } from './dto/create-firebase-uid.dto'
import { FirebaseUid } from './firebase-uid.model'

@Injectable()
export class FirebaseUidsService {
  constructor(@InjectModel(FirebaseUid) private firebaseUidRepository: typeof FirebaseUid) {}

  async create(createFirebaseUidDto: CreateFirebaseUidDto, transaction?: Transaction) {
    const options = transaction ? { transaction } : undefined
    return await this.firebaseUidRepository.create(createFirebaseUidDto, options)
  }
  async deleteByUser(idUser: number) {
    return await this.firebaseUidRepository.destroy({
      where: {
        iduser: idUser,
      },
    })
  }
  async deleteByFirebaseUid(uidFirebase: string) {
    return await this.firebaseUidRepository.destroy({
      where: {
        uid_firebase: uidFirebase,
      },
    })
  }

  async getByUidFirebase(uidFirebase: string) {
    return await this.firebaseUidRepository.findOne({
      where: { uid_firebase: uidFirebase },
      order: [['idfirebaseuid', 'DESC']],
    })
  }

  async getAllByIdUser(idUser: number) {
    return await this.firebaseUidRepository.findAll({ where: { iduser: idUser } })
  }
  async getOneByIdUser(idUser: number) {
    return await this.firebaseUidRepository.findOne({ where: { iduser: idUser } })
  }
}
