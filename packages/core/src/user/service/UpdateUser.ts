import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { CryptoProvider } from '../provider/CryptoProvider';
import { UserRepository } from '../provider/UserRepository';

export class UpdateUser implements UseCase<UserProps, UserProps> {

  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider
  ) { }

  async execute(data: UserProps, user?: UserProps): Promise<UserProps> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    // //usuário sem ID
    // if (!data.id) {
    //   throw new Error("Usuário inválido")
    // }

    const userExists = await this.repo.findById(data.id)

    if (!userExists) {
      throw new Error("Usuário não encontrado")

    } else {
      let hash = null
      if (data.password) {
        //gera senha cryptografada
        hash = await this.crypto.encrypt(data.password)
      }

      const newUser = await this.repo.save({ ...data, password: hash })
      return newUser
    }
  }

}