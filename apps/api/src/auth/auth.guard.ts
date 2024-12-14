import { CanActivate, ExecutionContext, ForbiddenException, HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtProvider } from 'src/providers/jwt.provider';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly tokenProvider: JwtProvider
  ) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    // try {
    const request = context.switchToHttp().getRequest()
    // console.log("REQ:", request)
    const { authorization } = request.headers

    if (authorization) {

      const [tokenType, tokenValue] = authorization?.split(" ")

      if (tokenType != "" && tokenValue != "") {
        if (tokenType === "Bearer" && await this.tokenProvider.validate(tokenValue))
          return true
        else
          throw new ForbiddenException("Acesso negado", { description: request.method + " " + request.url }) //, { description: "AuthGuard" }
        // return false
      }

    } else {
      throw new ForbiddenException("Acesso negado", { description: request.method + " " + request.url }) //, { description: "AuthGuard" }
      // return false
    }

    // } catch (error) {
    //   console.error(error.message)
    //   throw new InternalServerErrorException("Acesso negado", { cause: error }) //, { description: "AuthGuard" }
    //   // return false
    // }

  }
}
