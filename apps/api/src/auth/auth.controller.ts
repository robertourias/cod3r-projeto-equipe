import { Body, Controller, Headers, HttpException, Post, Res, UseFilters } from '@nestjs/common'
import { LoginUser, LogoutUser } from '@repo/core'
import { Response } from 'express'
import { CustomFilter } from 'src/errors/custom/custom.filter'
import { AuditPrisma } from 'src/providers/audit.prisma'
import { BcryptProvider } from 'src/providers/bcrypt.provider'
import { JwtProvider } from 'src/providers/jwt.provider'
import { UserPrisma } from 'src/providers/user.prisma'

@Controller('auth')
@UseFilters(CustomFilter)
export class AuthController {

  constructor(
    private readonly repo: UserPrisma,
    private readonly crypto: BcryptProvider,
    private readonly tokenProvider: JwtProvider,
    private readonly auditProvider: AuditPrisma
  ) { }

  @Post("login")
  async login(@Body() data: { email: string, password: string }, @Res() res: Response, @Headers("host") host: string, @Headers("user-agent") userAgent: string) {

    if (data.email == null || data.email == undefined || data.email == "" || data.password == null || data.password == undefined || data.password == "") {
      throw new Error("Obrigatório informar e-mail e senha")
    }
    const usecase = new LoginUser(this.repo, this.crypto, this.tokenProvider, this.auditProvider)
    const result = await usecase.execute(data, { host, userAgent })

    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        data: result.data
      })
    } else {
      throw new HttpException("Erro ao criar usuário: CreateUser()", result.status, { cause: result.errors })
    }
  }

  @Post("logout")
  async logout(@Body() email: string, @Res() res: Response, @Headers("host") host: string, @Headers("user-agent") userAgent: string) {

    if (email == null || email == undefined || email == "") {
      throw new Error("Obrigatório informar e-mail")
    }

    const usecase = new LogoutUser(this.repo, this.auditProvider)
    const result = await usecase.execute(email, { host, userAgent })

    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        message: result.message,
        data: result.data
      })
    } else {
      throw new HttpException("Erro ao criar usuário: CreateUser()", result.status, { cause: result.errors })
    }
  }


}
