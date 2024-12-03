import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { CryptoProvider } from '../provider/CryptoProvider';
import { TokenProvider } from '../provider/TokenProvider';
import { UserRepository } from '../provider/UserRepository';

export class CreateUser implements UseCase<UserProps, CoreResponse> {

  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider,
    private readonly tokenProvider: TokenProvider
  ) { }

  async execute(data: UserProps, user?: UserProps): Promise<CoreResponse> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    //new user
    if (!data?.id) {

      const userExists = await this.repo.findByEmail(data?.email)
      if (userExists) {
        throw new Error(`Usuário já existe com email: ${data?.email}`)
      }

    }

    //gera senha cryptografada
    const hash = await this.crypto.encrypt(data.password)

    const newUser = await this.repo.save({ ...data, password: hash })

    if (newUser) {
      const payload = {
        name: newUser.name,
        email: newUser.email
      }
      const token = await this.tokenProvider.signIn(payload)

      return {
        token,
        user: newUser
      }

    } else {
      throw new Error("Erro interno: não foi possível cadastrar o usuário")
    }

  }

}