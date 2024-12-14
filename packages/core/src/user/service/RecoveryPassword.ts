import { UseCase } from "../../common/UseCase";
import { CryptoProvider, UserProps, UserRepository } from "..";

export class RecoveryPassword implements UseCase<UserProps, UserProps> {
  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider
  ) { }
  async execute(data: any): Promise<UserProps> {
    const user = await this.repo.findByEmail(data.email);
    const now = new Date().getTime()
    if(!user){
      throw new Error("Email inválido")
    }
    if(data.token !== user.recoveryToken || now > +user.tokenExpiration){
      throw new Error("Token inválido");
    }
    const hash = await this.crypto.encrypt(data.newPassword)
    const newUser = await this.repo.save({...user, password: hash})
    return newUser
  }
}