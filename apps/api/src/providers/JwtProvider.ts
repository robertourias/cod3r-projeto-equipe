import * as jwt from "jsonwebtoken"
import { TokenProvider } from '@repo/core'
// import { ConfigService } from "@nestjs/config"   //erro: this.configService.get() -> undefined

export class JwtProvider implements TokenProvider {

  // constructor(private readonly configService: ConfigService) { }

  async signIn(payload: any): Promise<string> {
    // const secret1 = this.configService.get("SECRET") ?? "oj12lkjxs97xcv-=qw4312k4=df09s78df234"
    // console.log(secret1)
    const secret = process.env.SECRET ?? "oj12lkjxs97xcv-=qw4312k4=df09s78df234"
    return jwt.sign(payload, secret)
  }

}