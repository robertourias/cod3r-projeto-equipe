import { Body, Controller, Post } from '@nestjs/common'
import { LoginUser } from '@repo/core'
import { BcryptProvider } from 'src/providers/BcryptProvider'
import { JwtProvider } from 'src/providers/JwtProvider'
import { UserPrisma } from 'src/providers/user.prisma'
// import { UserRepository } from './user.repository'

@Controller('auth')
export class AuthController {

  constructor(
    private readonly repo: UserPrisma,
    private readonly crypto: BcryptProvider,
    private readonly tokenProvider: JwtProvider
  ) { }

  @Post("login")
  async login(@Body() data: { email: string, password: string }) {
    try {
      if (data.email == null || data.email == undefined || data.email == "" || data.password == null || data.password == undefined || data.password == "") {
        throw new Error("Obrigatório informar e-mail e senha")
      }
      const usecase = new LoginUser(this.repo, this.crypto, this.tokenProvider)
      return await usecase.execute(data)
    } catch (error: any) {
      console.error(error)
      return error.message
    }
  }



}
