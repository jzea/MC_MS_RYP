import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op, Sequelize } from 'sequelize'

import { Country } from './country.model'

@Injectable()
export class CountriesService {
  constructor(@InjectModel(Country) private countryRepository: typeof Country) {}

  async findByName(name) {
    const countrie = await this.countryRepository.findOne({
      where: Sequelize.where(Sequelize.fn('unaccent', Sequelize.fn('LOWER', Sequelize.col('country_name'))), {
        [Op.iLike]: `%${name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()}%`,
      }),
    })
    return countrie
  }
}
