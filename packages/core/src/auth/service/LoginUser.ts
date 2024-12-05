import { CoreResponse } from "../../common/CoreResponse";
import { UseCase } from "../../common/UseCase";
import { CryptoProvider, TokenProvider, UserProps, UserRepository } from "../../user";
import { LoginProps } from "../model/LoginProps";

export class LoginUser implements UseCase<LoginProps, CoreResponse> {

  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider,
    private readonly tokenProvider: TokenProvider
  ) { }

  async execute(data: LoginProps, user?: UserProps): Promise<CoreResponse> {

    //procurar usuario no BD pelo email com senha
    const userExist = await this.repo.findByEmail(data.email, true)

    if (userExist) {
      //comparar senhas
      const senhaIgual = await this.crypto.compare(userExist.password, data.password)

      if (senhaIgual) {
        //gerar token
        const token = await this.tokenProvider.signIn({ name: userExist.name, email: userExist.email })

        //exclui a senha do retorno
        delete userExist.password   

        return {
          token,
          user: userExist
        }

      } else {
        throw new Error("Usuário ou senha incorretos.")
      }

    } else {
      throw new Error("Usuário não encontrado.")
    }


  }
}