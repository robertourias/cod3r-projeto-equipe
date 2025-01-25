import { BadRequestException, Body, Controller, Headers, HttpException, Post, Res, UseFilters } from '@nestjs/common'
import { LoginUser, LogoutUser, GenerateToken, VerifyToken } from '@repo/core'
import { Response } from 'express'
import { CustomFilter } from 'src/errors/custom/custom.filter'
import { AuditPrisma } from 'src/providers/audit.prisma'
import { BcryptProvider } from 'src/providers/bcrypt.provider'
import { EmailProvider } from 'src/providers/email.provider'
import { JwtProvider } from 'src/providers/jwt.provider'
import { UserPrisma } from 'src/providers/user.prisma'

@Controller('auth')
@UseFilters(CustomFilter)
export class AuthController {

  constructor(
    private readonly repo: UserPrisma,
    private readonly crypto: BcryptProvider,
    private readonly tokenProvider: JwtProvider,
    private readonly auditProvider: AuditPrisma,
    private readonly sendEmail: EmailProvider
  ) { }

  @Post("login")
  async login(@Body() data: { email: string, password: string, token?:string }, @Res() res: Response, @Headers("host") host: string, @Headers("user-agent") userAgent: string) {

    if (data.email == null || data.email == undefined || data.email == "" || data.password == null || data.password == undefined || data.password == "") {
      throw new Error("Obrigatório informar e-mail e senha")
    }
    const usecase = new LoginUser(this.repo, this.crypto, this.tokenProvider, this.auditProvider)
    const result = await usecase.execute(data, { host, userAgent })

    if (result.success) {
      if(result.data.twoFactorAuth){
        // verifica se o usuário já passou pelo 2FA e se o token foi informado
        const email = data?.email
        if(!data.token){
          try {
            const usecase = new GenerateToken(this.repo);
            const user = await usecase.execute(email)
            if(!user){
              throw new BadRequestException("Email não encontrado");
            }else{
              await this.sendEmail.sendEmail2FA(user.email, user.recoveryToken)

              return res.status(401).json({
                status: result.status,
                data: result.data
              })
            }
          } catch (error) {
            return error.message
          }
        }
        
      }
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
