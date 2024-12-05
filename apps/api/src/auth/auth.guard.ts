import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtProvider } from 'src/providers/JwtProvider';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly tokenProvider: JwtProvider
  ) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    try {
      const request = context.switchToHttp().getRequest()
      const { authorization } = request.headers

      if (authorization) {

        const [tokenType, tokenValue] = authorization?.split(" ")
        // console.log(tokenValue)

        //TODO: criar validação real
        if (tokenType != "" && tokenValue != "") {
          if (tokenType === "Bearer" && await this.tokenProvider.validate(tokenValue))
            return true
          else
            return false
        }



      } else {
        return false
      }


    } catch (error) {
      console.error(error.message)
      return false
    }

  }
}
