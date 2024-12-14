import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { UserRepository } from '../provider/UserRepository';

export class ToggleUser implements UseCase<string, CoreResponse> {

  constructor(
    private readonly repo: UserRepository,
  ) { }

  async execute(id: string, user?: UserProps): Promise<CoreResponse> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    if (id == null || id == undefined || id == "") {
      return {
        success: false,
        message: "Erro de validação",
        status: 400,
        errors: ["ID precisa ser informado"]
      }

    } else {

      const userExists = await this.repo.findById(id)

      if (!userExists) {
        return {
          success: false,
          message: "Erro ao alterar usuário",
          status: 400,
          errors: [`Usuário não encontrado com ID: ${id}`]
        }

      } else {

        if (userExists.disabledAt == null) {
          //inativa usuário
          const newUser = await this.repo.save({
            ...userExists,
            disabledAt: new Date()
          })
          return {
            success: true,
            status: 200,
            message: "Usuário desativado com sucesso",
            data: {
              user: newUser
            }
          }

        } else {
          //ativa usuário
          const newUser = await this.repo.save({
            ...userExists,
            disabledAt: null
          })
          return {
            success: true,
            status: 200,
            message: "Usuário ativado com sucesso",
            data: {
              user: newUser
            }
          }
        }
      }

    }
  }

}