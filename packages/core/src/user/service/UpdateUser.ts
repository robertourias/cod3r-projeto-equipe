import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { isValidEmail, isValidName, isValidPassword } from '../../common/Validations';
import { UserProps } from '../model/User';
import { CryptoProvider } from '../provider/CryptoProvider';
import { UserRepository } from '../provider/UserRepository';

export class UpdateUser implements UseCase<UserProps, CoreResponse> {

  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider
  ) { }

  async execute(data: UserProps, user?: UserProps): Promise<CoreResponse> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    const errors: string[] = []

    //ID undefined gera erro prisma
    if (!data.id) {
      errors.push("ID precisa ser informado")
    }

    //Validação dos campos obrigatórios
    if (!isValidName(data.name)) {
      errors.push("Nome deve ser informado e ter de 3 a 100 caracteres: " + data.name)
    }

    if (!isValidEmail(data.email)) {
      errors.push("E-mail deve ser válido: " + data.email)
    }

    //TODO: passwords validation wrong
    if (!isValidPassword(data.password)) {
      errors.push("Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial: " + data.password)
    }

    if (errors.length > 0) {
      return {
        success: false,
        message: "Erro de validação",
        status: 400,
        errors: errors
      }
    }

    const userExists = await this.repo.findById(data.id+"")

    if (!userExists) {
      return {
        success: false,
        status: 400,
        message: "Erro ao alterar usuário",
        errors: [`Usuário não encontrado com ID: ${data.id}`]
      }

    } else {
      //criptografa a senha
      const hash = await this.crypto.encrypt(data.password)
      const newUser = await this.repo.save({ ...data, password: hash })

      return {
        success: true,
        status: 200,
        message: "Usuário atualizado com sucesso",
        data: {
          user: newUser
        }
      }
    }
  }

}