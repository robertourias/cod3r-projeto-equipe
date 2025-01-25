import { UserRepository, /*UserProps*/ } from "..";
//import { UserProps } from "../../dist";
// import { UseCase } from "./UseCase";

export class VerifyToken /*implements UseCase<UserProps, UserProps>*/ {
  constructor(
    private readonly repo: UserRepository
  ) { }
  async execute(data: any): Promise<boolean> {
    const user = await this.repo.findByEmail(data?.email)
    const now = new Date().getTime()
    if(!user){
      throw new Error("Email inválido")
    }
    if(data.token !== user.recoveryToken || now > +user.tokenExpiration){
      return false
    }
    return true
  }
}
