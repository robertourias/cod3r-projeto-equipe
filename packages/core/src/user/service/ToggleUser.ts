import { AuditRepository } from '../../audit';
import { SaveAudit } from '../../audit/service/SaveAudit';
import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { PermissionRepository } from '../../permission';
import { UserProps } from '../model/UserProps';
import { UserRepository } from '../provider/UserRepository';

export class ToggleUser implements UseCase<string, CoreResponse> {

  private readonly auditSave: SaveAudit

  constructor(
    private readonly repo: UserRepository,
    private readonly auditRepo: AuditRepository,
    private readonly permissionRepo: PermissionRepository
  ) {
    this.auditSave = new SaveAudit(this.auditRepo)
  }

  async execute(id: string, user?: UserProps): Promise<CoreResponse> {

    //só executar caso de uso se um usuário válido tiver sido informado
    if (user && user.email) {

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
            data: { id, user }
          }
        }

        //valida se 'usuario' tem permissão para executar esse caso de uso
        const userHasPermission = await this.permissionRepo.userHasPermission(userDB.id.toString(), "TOGGLE_USER")

        if (!userHasPermission) {
          return {
            success: false,
            status: 400,
            message: "O usuário não tem permissão para alterar o status de usuários",
          }
        }

        if (id == null || id == undefined || id == "") {

          await this.auditSave.execute({
            moduleName: "USER",
            useCase: "ToggleUser",
            message: "Erro de validação",
            userId: userDB.id,
            responseData: JSON.stringify("ID precisa ser informado"),
            host: host,
            userAgent: userAgent
          })

          return {
            success: false,
            message: "Erro de validação",
            status: 400,
            errors: ["ID precisa ser informado"]
          }

        } else {

          const userExists = await this.repo.findById(id)

          if (!userExists) {

            await this.auditSave.execute({
              moduleName: "USER",
              useCase: "ToggleUser",
              message: "Erro ao alterar usuário",
              userId: userDB.id,
              responseData: JSON.stringify("Usuário não encontrado"),
              requestData: JSON.stringify({ id }),
              host: host,
              userAgent: userAgent
            })

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

              await this.auditSave.execute({
                moduleName: "USER",
                useCase: "ToggleUser",
                message: "Usuário desativado com sucesso",
                userId: userDB.id,
                responseData: JSON.stringify({ user: { id: newUser.id, email: newUser.email } }),
                requestData: JSON.stringify({ id }),
                host: host,
                userAgent: userAgent
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

              await this.auditSave.execute({
                moduleName: "USER",
                useCase: "ToggleUser",
                message: "Usuário ativado com sucesso",
                userId: userDB.id,
                responseData: JSON.stringify({ user: { id: newUser.id, email: newUser.email } }),
                requestData: JSON.stringify({ id }),
                host: host,
                userAgent: userAgent
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


    } else {
      //usuário não informado - logar e retornar com erro
      await this.auditSave.execute({
        moduleName: "USER",
        useCase: "FindUser",
        message: "Erro de validação",
        responseData: JSON.stringify("Usuário inválido: e-mail não informado"),
        requestData: JSON.stringify({ id, user }),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: false,
        status: 400,
        message: "E-mail não informado",
        data: { id, user }
      }
    }

  }//execute

}