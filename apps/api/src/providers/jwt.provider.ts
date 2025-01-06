import * as jwt from "jsonwebtoken"
import { TokenProvider } from '@repo/core'
import { Logger } from "@nestjs/common"

export class JwtProvider implements TokenProvider {

  private readonly secret = process.env.SECRET ?? "oj12lkjxs97xcv-=qw4312k4=df09s78df234"

  async validate(token: string): Promise<boolean> {
    const logger = new Logger(JwtProvider.name)
    try {
      jwt.verify(token, this.secret)
      return true
    } catch (error) {
      logger.error("JwtProvider: " + error.message)
      return false
    }
  }

  async signIn(payload: any): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: "1h"    //15m, 1d, 1h, 30s
    })
  }

  static async getPayload(string: any): Promise<any> {
    return await jwt.verify(string, process.env.SECRET)
  }

}