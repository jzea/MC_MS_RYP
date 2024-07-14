import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Observable } from 'rxjs'
import { JwtService } from '@nestjs/jwt'
import { Messages } from 'src/utils/messages.enum'
import { language } from 'src/main'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
    try {
      const authHeader = req.headers.authorization
      const [bearer, token] = authHeader.split(' ')

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(Messages.USER_NOT_AUTHORIZED[language.code])
      }

      const user = this.jwtService.verify(token)
      req.user = user
      return true
    } catch (e) {
      throw new UnauthorizedException(Messages.USER_NOT_AUTHORIZED[language.code])
    }
  }
}
