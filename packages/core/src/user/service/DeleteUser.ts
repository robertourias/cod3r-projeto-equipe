import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { UserRepository } from '../provider/UserRepository';

export class DeleteUser implements UseCase<string, UserProps> {

  constructor(
    private readonly repo: UserRepository,
    //TODO: private readonly crypto: CryptoProvider
    //TODO: private readonly tokenProvider: TokenProvider
  ) { }

  async execute(id: string, user?: UserProps): Promise<UserProps> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    const userExists = await this.repo.findById(id)

    if (userExists) {      
      const deletedUser = await this.repo.delete(id)
      return deletedUser

    } else {
      throw new Error(`Usuário não encontrado com ID: ${id} `)
    }

  }

}