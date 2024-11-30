import { Controller, Post } from '@nestjs/common'
// import { UserRepository } from './user.repository'

@Controller('auth')
export class AuthController {

  // constructor(private readonly repo: UserRepository) { }

  @Post("login")
  async login() {
    return "login"
  }



}
