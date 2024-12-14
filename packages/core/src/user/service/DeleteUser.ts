import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { UserRepository } from '../provider/UserRepository';

export class DeleteUser implements UseCase<string, CoreResponse> {

  constructor(
    private readonly repo: UserRepository,
  ) { }

  async execute(id: string, user?: UserProps): Promise<CoreResponse> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    const errors: string[] = []

    //validar ID antes de buscar no BD, para evitar erro ID undefined
    if (!id) {
      errors.push("ID precisa ser informado")
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: "Erro de validação",
        status: 400,
        errors: errors
      }
    }

    const userExists = await this.repo.findById(id)

    if (!userExists) {
      return {
        success: false,
        status: 400,
        message: "Erro ao excluir usuário",
        errors: [`Usuário não encontrado com ID: ${id}`]
      }

    } else {
      const deletedUser = await this.repo.delete(id)
      
      return {
        success: true,
        status: 200,
        message: "Usuário excluido com sucesso",
        data: {
          user: deletedUser
        }
      }
    }
  }

}