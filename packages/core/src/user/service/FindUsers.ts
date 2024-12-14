import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { UserRepository } from '../provider/UserRepository';

export class FindUsers implements UseCase<string | null, CoreResponse> {

  constructor(
    private readonly repo: UserRepository,
  ) { }

  async execute(id?: string, user?: UserProps, withPassword: boolean = false): Promise<CoreResponse> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    if (id) {
      const result = await this.repo.findById(id, withPassword)

      if (result) {
        return {
          success: true,
          status: 200,
          data: result
        }

      } else {
        return {
          success: false,
          status: 400,
          message: "Usuário não encontrado",
          data: result
        }
      }

    } else {
      const result = await this.repo.findAll(withPassword)

      if (result.length > 0) {
        return {
          success: true,
          status: 200,
          data: result
        }

      } else {
        return {
          success: false,
          status: 400,
          message: "Nenhum usuário encontrado",
          data: result
        }
      }
    }
  }

}