import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { AuditPrisma } from 'src/providers/audit.prisma';
import { JwtProvider } from 'src/providers/jwt.provider';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly tokenProvider: JwtProvider,
    private readonly auditProvider: AuditPrisma
  ) { }

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    // try {
    const request = context.switchToHttp().getRequest()
    // console.log("REQ:", request)
    const { authorization, host } = request.headers
    const userAgent = request.headers["user-agent"]

    if (authorization) {

      const [tokenType, tokenValue] = authorization?.split(" ")

      if (tokenType != "" && tokenValue != "") {
        if (tokenType === "Bearer" && await this.tokenProvider.validate(tokenValue)) {
          return true
        } else {
          // console.log("authGuard.canActivate()")
          await this.auditProvider.save({
            moduleName: "AUTHGUARD",
            useCase: "tokenValidate",
            message: "Acesso Negado",
            requestData: JSON.stringify({ description: "Invalid token", method: request.method, url: request.url }),
            host: host,
            userAgent: userAgent
          })
          throw new ForbiddenException("Acesso negado", { description: request.method + " " + request.url }) //, { description: "AuthGuard" }
        }
        // return false
      }

    } else {
      await this.auditProvider.save({
        moduleName: "AUTHGUARD",
        useCase: "tokenValidate",
        message: "Acesso Negado",
        requestData: JSON.stringify({ description: "No token provided", method: request.method, url: request.url }),
        host: host,
        userAgent: userAgent
      })
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
