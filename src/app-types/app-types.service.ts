import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { AppType } from './app-type.model'

@Injectable()
export class AppTypesService {
  constructor(@InjectModel(AppType) private userRepository: typeof AppType) {}

  async getAll() {
    return await this.userRepository.findAll({
      attributes: ['idapptype', 'type_name'],
    })
  }
}
