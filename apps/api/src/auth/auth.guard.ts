import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const request = context.switchToHttp().getRequest()
    const { authorization } = request.headers

    if (authorization) {
      const [tokenType, tokenValue] = authorization?.split(" ")

      //TODO: criar validação real
      if (tokenType === "Bearer" && tokenValue === "123456")
        return true
      else
        return false

    } else {
      return false
    }

  }
}
