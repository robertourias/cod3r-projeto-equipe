import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { UserRepository } from '../provider/UserRepository';

export class CreateUser implements UseCase<UserProps, UserProps> {

  constructor(
    private readonly repo: UserRepository,
    //TODO: private readonly crypto: CryptoProvider
    //TODO: private readonly tokenProvider: TokenProvider
  ) { }

  async execute(data: UserProps, user?: UserProps): Promise<UserProps> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    //new user
    if (!data.id) {

      const userExists = await this.repo.findByEmail(data.email)
      if (userExists) {
        throw new Error(`Usuário já existe com email: ${data.email}`)
      }

    }

    //TODO: incluir cryptografia
    const newUser = await this.repo.save(data)
    return newUser
  }

}