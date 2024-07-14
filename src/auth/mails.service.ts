import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { User } from 'src/users/user.model'
import * as Handlebars from 'handlebars'
import { templateBuyer, templateSeller } from 'src/utils/resources/template-email'

import { CreateMailDto } from './dto/create-mail.dto'

@Injectable()
export class MailsService {
  constructor(private readonly httpService: HttpService) {}

  async sendEmail(dto: CreateMailDto) {
    try {
      const response = await this.httpService.post(process.env.MC_MS_CORE_MAIL_URL, dto, {}).toPromise()
      return response.data
    } catch (error) {
      console.log('ERROR AL ENVIAR EMAIL', error)
    }
  }

  async sendEmailBuyer(idUser: number): Promise<boolean> {
    const user = await User.findByPk(idUser)

    const templateData = {
      userName: user.name,
    }

    const subjectTemplate = Handlebars.compile(templateBuyer[user.lang].subject)
    const messageTemplate = Handlebars.compile(templateBuyer[user.lang].message)

    const subject = subjectTemplate(templateData)
    const message = messageTemplate(templateData)

    const dtoMessage = new CreateMailDto()
    dtoMessage.subject = subject
    dtoMessage.text = message
    dtoMessage.to = user.email

    await this.sendEmail(dtoMessage)
    return true
  }

  async sendEmailSeller(idUser: number): Promise<boolean> {
    const user = await User.findByPk(idUser)

    const templateData = {
      userName: user.name,
    }

    const subjectTemplate = Handlebars.compile(templateSeller[user.lang].subject)
    const messageTemplate = Handlebars.compile(templateSeller[user.lang].message)

    const subject = subjectTemplate(templateData)
    const message = messageTemplate(templateData)

    const dtoMessage = new CreateMailDto()
    dtoMessage.subject = subject
    dtoMessage.text = message
    dtoMessage.to = user.email

    await this.sendEmail(dtoMessage)
    return true
  }
}
