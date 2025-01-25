import { AuditRepository } from "../../audit"
import { SaveAudit } from "../../audit/service/SaveAudit"
import { CoreResponse } from "../../common/CoreResponse"
import { UseCase } from "../../common/UseCase"
import { UserProps } from "../../user"
import { PermissionUserProps } from "../model/PermissionUserProps"
import { PermissionRepository } from "../provider/PermissionRepository"

export class RemovePermissionFromUser implements UseCase<PermissionUserProps, CoreResponse> {

  private readonly saveAudit: SaveAudit

  constructor(
    private readonly repo: PermissionRepository,
    private readonly auditRepo: AuditRepository
  ) {
    this.saveAudit = new SaveAudit(this.auditRepo)
  }


  async execute(data: PermissionUserProps, user?: UserProps): Promise<CoreResponse> {

    if (user && user.email) {

      //usuário precisa ser informado para este caso de uso
      if (user.email) {

        const host = user?.host
        const userAgent = user?.userAgent
        const userDB = await this.repo.findUserByEmail(user.email)

        //usuário não encontrado
        if (!userDB) {
          return {
            success: false,
            status: 400,
            message: "Usuário não encontrado com e-mail " + user.email,
            data: { data, user }
          }
        }

        //valida se 'usuario' tem permissão para executar esse caso de uso

        const userHasPermission = await this.repo.userHasPermission(userDB.id.toString(), "REMOVE_PERMISSION_USER")
        if (!userHasPermission) {
          return {
            success: false,
            status: 401,
            message: "Não autorizado: remover permissão de usuário",
          }
        }

        //Validação dos dados
        const errors: string[] = []

        //ID undefined gera erro prisma
        if (!data.permissionId) {
          errors.push("ID da permissão precisa ser informado")
        }
        if (!data.userId) {
          errors.push("ID do usuário precisa ser informado")
        }

        if (errors.length > 0) {
          await this.saveAudit.execute({
            moduleName: "PERMISSION",
            useCase: "RemovePermissionFromUser",
            message: "Erro de validação",
            userId: userDB.id,
            responseData: JSON.stringify({ errors }),
            requestData: JSON.stringify({ data, user }),
            host: host,
            userAgent: userAgent
          })

          return {
            success: false,
            message: "Erro de validação",
            status: 400,
            errors: errors,
            data: data
          }
        }

        //verifica se a permissão e perfil existem
        const permissionExist = await this.repo.findById(data.permissionId.toString())
        const userExist = await this.repo.findUserById(data.userId)

        //verifica se já existe o vinculo
        const permissionExistOnUser = await this.repo.findPermissionOnUser(data.permissionId, data.userId)

        if (!permissionExist) {
          errors.push("Permissão não encontrada: " + data.permissionId)
        }

        if (!userExist) {
          errors.push("Usuário não encontrado: " + data.userId)
        }

        if (!permissionExistOnUser) {
          errors.push(`Permissão \'${permissionExist?.name}\' não está vinculada ao usuário \'${userExist?.name}\' `)
        }

        if (errors.length > 0) {
          return {
            success: false,
            status: 400,
            message: "Não é possível remover a permissão do usuário",
            errors: [...errors]
          }
        }

        const removedPermissionOnUser = await this.repo.removePermissionFromUser(data.permissionId, data.userId)

        return {
          success: true,
          status: 200,
          message: "Permissão removida do usuário com sucesso.",
          data: { ...removedPermissionOnUser }
        }

      }


    } else {
      //usuário não informado - logar e retornar com erro
      await this.saveAudit.execute({
        moduleName: "PERMISSION",
        useCase: "RemovePermissionFromUser",
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
  }

}