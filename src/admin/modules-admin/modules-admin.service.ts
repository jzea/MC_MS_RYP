import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { ModulesAdmin } from './modules-admin.model'

@Injectable()
export class ModulesAdminService {
  constructor(@InjectModel(ModulesAdmin) private modulesAdminRepository: typeof ModulesAdmin) {}

  async getAll() {
    return await this.modulesAdminRepository.findAll({
      include: [
        {
          all: true,
        },
      ],
    })
  }
}
