import { AuditRepository } from '../../audit';
import { SaveAudit } from '../../audit/service/SaveAudit';

import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { isValidEmail, isValidName, isValidPassword } from '../../common/Validations';
import { UserProps } from '../model/UserProps';
import { CryptoProvider } from '../provider/CryptoProvider';
import { TokenProvider } from '../provider/TokenProvider';
import { UserRepository } from '../provider/UserRepository';

export class CreateUser implements UseCase<UserProps, CoreResponse> {

  private readonly auditSave: SaveAudit

  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider,
    private readonly tokenProvider: TokenProvider,
    private readonly auditRepo: AuditRepository
  ) {
    this.auditSave = new SaveAudit(this.auditRepo)
  }

  async execute(data: UserProps, user?: UserProps): Promise<CoreResponse> {

    //TODO: validar aqui se 'user' tem permissão para executar esse caso de uso

    const errors: string[] = []

    //Validação dos campos obrigatórios
    if (!isValidName(data.name)) {
      errors.push("Nome deve ser informado e ter de 3 a 100 caracteres. Valor informado: " + data.name)
    }

    if (!isValidEmail(data.email)) {
      errors.push("E-mail deve ser válido. Valor informado: " + data.email)
    }

    if (!isValidPassword(data.password)) {
      errors.push("Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial. Valor informado: " + data.password)
    }

    if (errors.length > 0) {

      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "CreateUser",
        message: "Erro de validação",
        responseData: JSON.stringify({ errors }),
        host: user.host,
        userAgent: user.userAgent
      })

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

      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "CreateUser",
        message: "Erro ao inserir usuário",
        responseData: JSON.stringify(`Usuário já cadastrado com este e-mail: ${data?.email}`),
        host: user.host,
        userAgent: user.userAgent
      })

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

      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "CreateUser",
        message: "Usuário criado com sucesso",
        responseData: JSON.stringify({ user: { id: newUser.id, email: newUser.email }, ...user }),
        host: user.host,
        userAgent: user.userAgent
      })

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

      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "CreateUser",
        message: "Erro interno: Não foi possível cadastrar o usuário",
        responseData: JSON.stringify(newUser),
        host: user.host,
        userAgent: user.userAgent
      })

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
