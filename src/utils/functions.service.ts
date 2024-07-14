import { User } from 'src/users/user.model'

export class FunctionService {
  generateUsername(user: User): string {
    const emailLetter = user.email.slice(0, 2).toUpperCase()
    const nameLetter = user.name.slice(0, 2).toUpperCase()
    const date = new Date(user.createdAt)
    const day = date.getDate().toString().padStart(2, '0')
    const mounth = (date.getMonth() + 1).toString().padStart(2, '0')

    const paddedCounter = user.iduser.toString().padStart(5, '0')

    const username = `${emailLetter}${nameLetter}${day}${mounth}${paddedCounter}`

    return username
  }
}
