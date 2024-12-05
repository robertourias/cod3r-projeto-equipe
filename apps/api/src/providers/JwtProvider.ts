import * as jwt from "jsonwebtoken"
import { TokenProvider } from '@repo/core'
// import { ConfigService } from "@nestjs/config"   //erro: this.configService.get() -> undefined

export class JwtProvider implements TokenProvider {

  private readonly secret = process.env.SECRET ?? "oj12lkjxs97xcv-=qw4312k4=df09s78df234"

  async validate(token: string): Promise<boolean> {

    try {
      jwt.verify(token, this.secret)
      return true
    } catch (error) {
      console.error("JwtProvider:",error.message)
      return false
    }

  }

  // constructor(private readonly configService: ConfigService) { }

  async signIn(payload: any): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: "1h"    //15m, 1d, 1h, 30s
    })
  }

}