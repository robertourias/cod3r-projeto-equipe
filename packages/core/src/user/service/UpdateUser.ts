import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { UserRepository } from '../provider/UserRepository';

export class UpdateUser implements UseCase<UserProps, UserProps> {

  constructor(
    private readonly repo: UserRepository,
    //TODO: private readonly crypto: CryptoProvider
    //TODO: private readonly tokenProvider: TokenProvider
  ) { }

  async execute(data: UserProps, user?: UserProps): Promise<UserProps> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    if (!data.id) {
      throw new Error("Usuário inválido")
    }

    const userExists = await this.repo.findById(data.id)

    if (userExists) {
      
      const newUser = await this.repo.save(data)
      return newUser
    } else {
      throw new Error(`Usuário não encontrado com ID: ${data.id} `)
    }

  }

}