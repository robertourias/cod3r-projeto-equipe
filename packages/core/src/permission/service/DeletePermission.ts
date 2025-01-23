import { AuditRepository } from "../../audit"
import { SaveAudit } from "../../audit/service/SaveAudit"
import { CoreResponse } from "../../common/CoreResponse"
import { UseCase } from "../../common/UseCase"
import { UserProps } from "../../user"
import { PermissionRepository } from "../provider/PermissionRepository"

export class DeletePermission implements UseCase<string, CoreResponse> {

  private readonly saveAudit: SaveAudit

  constructor(
    private readonly repo: PermissionRepository,
    private readonly auditRepo: AuditRepository,
  ) {
    this.saveAudit = new SaveAudit(this.auditRepo)
  }


  async execute(id: string, user?: UserProps): Promise<CoreResponse> {

    // console.log("TogglePermission: ", id, user)

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
            data: { id, user }
          }
        }

        //valida se 'usuario' tem permissão para executar esse caso de uso
        const userHasPermission = await this.repo.userHasPermission(userDB.id.toString(), "DELETE_PERMISSION")
        if(!userHasPermission){
          return {
            success: false,
            status: 401,
            message: "Não autorizado: excluir permissão",
          }
        }

        if (id && isNaN(+id)) {
          return {
            success: false,
            status: 400,
            message: "Id inválido: " + id,
            data: { id, user }
          }
        }

        //Validação dos dados
        if (!id && !isNaN(+id)) {
          await this.saveAudit.execute({
            moduleName: "PROFILE",
            useCase: "DeletePermission",
            message: "Erro de validação",
            userId: userDB.id,
            responseData: JSON.stringify("ID inválido"),
            host: host,
            userAgent: userAgent
          })

          return {
            success: false,
            message: "Erro de validação",
            status: 400,
            errors: ["ID inválido"]
          }
        }


        const permissionExist = await this.repo.findById(id)

        // console.debug("permissionExist:", JSON.stringify(permissionExist, null, 2))

        if (!permissionExist) {
          return {
            success: false,
            status: 400,
            message: "Erro de validação",
            errors: ["Perfil não encontrado com Id: " + id]
          }

        } else {

          //proteção para não excluir o perfil ADMIN
          if (permissionExist.name === "ADMIN") {
            return {
              success: false,
              status: 400,
              message: "Erro",
              errors: ["Perfil ADMIN não pode ser excluido"]
            }
          }

          //verifica se o perfil possui usuários vinculados
          if (permissionExist.Users.length > 0) {
            console.log(permissionExist.Users)
            const linkedUser = permissionExist.Users.map((userPermission) => {
              return userPermission.User.name
            })
            return {
              success: false,
              status: 400,
              message: "Erro na exclusão",
              errors: [`Perfil \'${permissionExist.name}\' possui usuários vinculados`, ...linkedUser]
            }
          }

          //Permissões não dependem do perfil,
          // if (permissionExist.Permissions.length > 0) {
          //   const linkedPermission = permissionExist.Permissions.map((permissionPermission) => {
          //     return permissionPermission.Permission.name
          //   })
          //   // console.log(linkedPermission)
          //   return {
          //     success: false,
          //     status: 400,
          //     message: "Erro na exclusão",
          //     errors: [`Perfil \'${permissionExist.name}\' possui permissões vinculadas`, ...linkedPermission]
          //   }
          // }

          const result = await this.repo.delete(+permissionExist.id)

          if (result) {
            return {
              success: true,
              status: 200,
              message: "Permissão excluida com sucesso.",
              data: { permission: permissionExist }
            }
          }

        }

      }

    } else {
      //usuário não informado - logar e retornar com erro
      await this.saveAudit.execute({
        moduleName: "PERMISSION",
        useCase: "DeletePermission",
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
  }

}