import { AuditRepository } from '../../audit';
import { SaveAudit } from '../../audit/service/SaveAudit';
import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { isValidEmail, isValidName, isValidPassword } from '../../common/Validations';
import { UserProps } from '../model/UserProps';
import { CryptoProvider } from '../provider/CryptoProvider';
import { UserRepository } from '../provider/UserRepository';

export class UpdateUser implements UseCase<UserProps, CoreResponse> {

  private readonly auditSave: SaveAudit

  constructor(
    private readonly repo: UserRepository,
    private readonly crypto: CryptoProvider,
    private readonly auditRepo: AuditRepository
  ) {
    this.auditSave = new SaveAudit(this.auditRepo)
  }

  async execute(data: UserProps, user?: UserProps): Promise<CoreResponse> {

    if (user && user.email) {

      //usuário precisa ser informado para este caso de uso
      if (user.email) {

        const host = user?.host
        const userAgent = user?.userAgent
        const userDB = await this.repo.findByEmail(user.email)

        //usuário não encontrado
        if (!userDB) {
          return {
            success: false,
            status: 400,
            message: "Usuário não encontrado com e-mail " + user.email,
            data: { data, user }
          }
        }

        //TODO: validar aqui se 'usuario' tem permissão para executar esse caso de uso

        const errors: string[] = []

        //ID undefined gera erro prisma
        if (!data.id) {
          errors.push("ID precisa ser informado")
        }

        //Validação dos campos obrigatórios
        if (!isValidName(data.name)) {
          errors.push("Nome deve ser informado e ter de 3 a 100 caracteres. Valor informado: " + data.name)
        }

        if (!isValidEmail(data.email)) {
          errors.push("E-mail deve ser válido. Valor informado: " + data.email)
        }

        //TODO: passwords validation wrong
        if (!isValidPassword(data.password)) {
          errors.push("Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caracter especial. Valor informado: " + data.password)
        }

        if (errors.length > 0) {

          await this.auditSave.execute({
            moduleName: "USER",
            useCase: "UpdateUser",
            message: "Erro de validação",
            userId: userDB.id,
            responseData: JSON.stringify({ errors }),
            // requestData: JSON.stringify({ id: data.id }),
            host: host,
            userAgent: userAgent
          })

          return {
            success: false,
            message: "Erro de validação",
            status: 400,
            errors: errors
          }
        }

        const userExists = await this.repo.findById(data.id)

        if (!userExists) {

          await this.auditSave.execute({
            moduleName: "USER",
            useCase: "UpdateUser",
            message: "Erro ao alterar usuário",
            userId: userDB.id,
            responseData: JSON.stringify("Usuário não encontrado."),
            requestData: JSON.stringify({ id: data.id }),
            host: host,
            userAgent: userAgent
          })

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

          await this.auditSave.execute({
            moduleName: "USER",
            useCase: "UpdateUser",
            message: "Usuário atualizado com sucesso",
            userId: userDB.id,
            responseData: JSON.stringify({ user: { ...newUser, password: undefined } }),
            requestData: JSON.stringify({ id: data.id }),
            beforeUpdate: JSON.stringify({ user: { ...userExists, password: undefined } }),
            host: host,
            userAgent: userAgent
          })

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


    } else {
      //usuário não informado - logar e retornar com erro
      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "FindUser",
        message: "Erro de validação",
        responseData: JSON.stringify("Usuário inválido: e-mail não informado"),
        requestData: JSON.stringify({ data, user }),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: false,
        status: 400,
        message: "E-mail não informado",
        data: { data, user }
      }
    }









  }//execute

}