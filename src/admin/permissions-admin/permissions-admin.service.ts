import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'

import { PermissionsAdmin } from './permissions-admin.model'

@Injectable()
export class PermissionsAdminService {
  constructor(@InjectModel(PermissionsAdmin) private permissionsAdminRepository: typeof PermissionsAdmin) {}

  async getAll() {
    return await this.permissionsAdminRepository.findAll({
      include: [
        {
          all: true,
        },
      ],
    })
  }
}
