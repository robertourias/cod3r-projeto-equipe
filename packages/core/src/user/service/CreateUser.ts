
import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { isValidEmail, isValidName, isValidPassword } from '../../common/Validations';
import { UserProps } from '../model/User';
import { CryptoProvider } from '../provider/CryptoProvider';
import { TokenProvider } from '../provider/TokenProvider';
import { UserRepository } from '../provider/UserRepository';

export class CreateUser implements UseCase<UserProps, CoreResponse> {

  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider,
    private readonly tokenProvider: TokenProvider
  ) { }

  async execute(data: UserProps, user?: UserProps): Promise<CoreResponse> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    const errors: string[] = []

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

    //verifica se o email informando já existe, caso sim, retorna com erro
    const userExists = await this.repo.findByEmail(data?.email)

    if (userExists) {
      // throw new Error(`Usuário já existe com email: ${data?.email}`)
      return {
        success: false,
        message: "Erro ao inserir usuário",
        status: 400,
        errors: [`Usuário já cadastrado com este e-mail: ${data?.email}`]
      }
    }

    //cryptografa a senha
    const hash = await this.crypto.encrypt(data.password)

    const newUser = await this.repo.save({ ...data, password: hash })

    if (newUser.id) {
      const payload = {
        name: newUser.name,
        email: newUser.email
      }
      const token = await this.tokenProvider.signIn(payload)

      return {
        success: true,
        status: 201,
        message: "Usuário criado com sucesso",
        data: {
          token,
          user: newUser
        }
      }

    } else {
      // throw new Error("Erro interno: não foi possível cadastrar o usuário")
      return {
        success: false,
        message: "Erro interno",
        status: 500,
        errors: ['Não foi possível cadastrar o usuário'],
        data: newUser
      }
    }

  }



}
