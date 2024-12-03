import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { UserRepository } from '../provider/UserRepository';

export class ToggleUser implements UseCase<string, UserProps> {

  constructor(
    private readonly repo: UserRepository,
  ) { }

  async execute(id: string, user?: UserProps): Promise<UserProps> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    if (id == null || id == undefined || id == "") {
      throw new Error("Usuário inválido")

    } else {

      const userExists = await this.repo.findById(id)

      if (!userExists) {
        throw new Error("Usuário não encontrado")

      } else {

        if (userExists.disabledAt == null) {
          //inativa usuário
          const newUser = await this.repo.save({
            ...userExists,
            disabledAt: new Date()
          })
          return newUser

        } else {
          //ativa usuário
          const newUser = await this.repo.save({
            ...userExists,
            disabledAt: null
          })
          return newUser
        }
      }

    }
  }

}