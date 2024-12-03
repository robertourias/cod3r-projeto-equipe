import { UseCase } from '../../common/UseCase'
import { UserProps } from '../model/User';
import { UserRepository } from '../provider/UserRepository';

export class FindUsers implements UseCase<string | null, UserProps | UserProps[] | null> {

  constructor(
    private readonly repo: UserRepository,
  ) { }

  async execute(id?: string, user?: UserProps, withPassword: boolean = false): Promise<UserProps | UserProps[] | null> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    if (id) {
      return await this.repo.findById(id, withPassword)
    } else {
      return await this.repo.findAll(withPassword)
    }
  }

}