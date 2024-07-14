import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { NotificationDto } from 'src/users/dto/notification.dto'
import { UsersService } from 'src/users/users.service'
import { NotificationMessages } from 'src/utils/notification-messages.enum'

@Injectable()
export class NotificationService {
  constructor(private readonly httpService: HttpService, private userService: UsersService) {}

  async sendNotification(dto: NotificationDto) {
    try {
      const response = await this.httpService.post(process.env.MC_MS_CORE_NOTIFICATION_URL, dto, {}).toPromise()
      return response.data
    } catch (error) {
      throw error
    }
  }

  async welcomeUser(idUser: number) {
    const userReceive = await this.userService.getById(idUser)
    if (userReceive) {
      const action = { screan: 'welcome' }
      const notificationDto: NotificationDto = {
        receiver_iduser: userReceive.iduser,
        sender_iduser: userReceive.iduser,
        title: NotificationMessages.WELCOME_MESSAGE[userReceive.lang],
        description: NotificationMessages.THANK_YOU_MESSAGE[userReceive.lang],
        action: JSON.stringify(action),
      }
      await this.sendNotification(notificationDto)
    }
    return true
  }
}
