import { AuditRepository } from '../../audit';
import { SaveAudit } from '../../audit/service/SaveAudit';
import { CoreResponse } from '../../common/CoreResponse';
import { UseCase } from '../../common/UseCase'
import { PermissionRepository } from '../../permission';
import { UserProps } from '../model/UserProps';
import { UserRepository } from '../provider/UserRepository';

export class DeleteUser implements UseCase<string, CoreResponse> {

  private readonly auditSave: SaveAudit

  constructor(
    private readonly repo: UserRepository,
    private readonly auditRepo: AuditRepository,
    private readonly permissionRepo: PermissionRepository
  ) {
    this.auditSave = new SaveAudit(this.auditRepo)
  }

  async execute(id: string, user?: UserProps): Promise<CoreResponse> {

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
            data: { id, user }
          }
        }


        //valida se 'usuario' tem permissão para executar esse caso de uso
        const userHasPermission = await this.permissionRepo.userHasPermission(userDB.id.toString(), "DELETE_USER")

        if (!userHasPermission) {
          return {
            success: false,
            status: 401,
            message: "Não autorizado: excluir usuário",
          }
        }

        if (!id) {

          await this.auditSave.execute({
            moduleName: "USER",
            useCase: "DeleteUser",
            message: "Erro de validação",
            userId: userDB.id,
            responseData: JSON.stringify("Id precisa ser informado"),
            host: host,
            userAgent: userAgent
          })

          return {
            success: false,
            message: "Erro de validação",
            status: 400,
            errors: ["Id precisa ser informado"]
          }
        }

        const userExists = await this.repo.findById(id)

        if (!userExists) {

          await this.auditSave.execute({
            moduleName: "USER",
            useCase: "DeleteUser",
            message: "Erro ao excluir usuário",
            userId: userDB.id,
            responseData: JSON.stringify(`Usuário não encontrado com ID: ${id}`),
            host: host,
            userAgent: userAgent
          })

          return {
            success: false,
            status: 400,
            message: "Erro ao excluir usuário",
            errors: [`Usuário não encontrado com ID: ${id}`]
          }

        } else {
          //TODO: em produção alterar para desativar usuário ao invés de excluir
          const deletedUser = await this.repo.delete(id)

          await this.auditSave.execute({
            moduleName: "USER",
            useCase: "DeleteUser",
            message: "Usuário excluido com sucesso",
            userId: userDB.id,
            responseData: JSON.stringify({ user: deletedUser }),
            host: host,
            userAgent: userAgent
          })

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