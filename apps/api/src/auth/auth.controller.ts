import { Body, Controller, HttpException, Post, Res, UseFilters } from '@nestjs/common'
import { LoginUser } from '@repo/core'
import { Response } from 'express'
import { CustomFilter } from 'src/errors/custom/custom.filter'
import { BcryptProvider } from 'src/providers/bcrypt.provider'
import { JwtProvider } from 'src/providers/jwt.provider'
import { UserPrisma } from 'src/providers/user.prisma'

@Controller('auth')
@UseFilters(CustomFilter)
export class AuthController {

  constructor(
    private readonly repo: UserPrisma,
    private readonly crypto: BcryptProvider,
    private readonly tokenProvider: JwtProvider
  ) { }

  @Post("login")
  async login(@Body() data: { email: string, password: string }, @Res() res: Response) {
    
    // try {
    if (data.email == null || data.email == undefined || data.email == "" || data.password == null || data.password == undefined || data.password == "") {
      throw new Error("Obrigatório informar e-mail e senha")
    }
    const usecase = new LoginUser(this.repo, this.crypto, this.tokenProvider)
    const result = await usecase.execute(data)

    if (result.success) {
      res.status(result?.status ?? 200).json({
        status: result.status,
        data: result.data
      })
    } else {
      throw new HttpException("Erro ao criar usuário: CreateUser()", result.status, { cause: result.errors })
    }

    // } catch (error: any) {
    //   // console.error(error)
    //   return error.message
    // }
  }



}
