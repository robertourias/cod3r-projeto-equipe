import { AuditRepository } from "../../audit"
import { SaveAudit } from "../../audit/service/SaveAudit"
import { CoreResponse } from "../../common/CoreResponse"
import { UseCase } from "../../common/UseCase"
import { UserProps } from "../../user"
import { PermissionRepository } from "../provider/PermissionRepository"

export class TogglePermission implements UseCase<string, CoreResponse> {

  private readonly saveAudit: SaveAudit

  constructor(
    private readonly repo: PermissionRepository,
    private readonly auditRepo: AuditRepository
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
            status: 400,
            message: "O usuário não tem permissão para mudar o status de uma permissão",
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
            moduleName: "PERMISSION",
            useCase: "TogglePermission",
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

        if (!permissionExist) {
          return {
            success: false,
            status: 400,
            message: "Erro de validação",
            errors: ["Permissão não encontrada com Id:" + id]
          }

        } else {

          if (permissionExist.name === "ADMIN") {
            return {
              success: false,
              status: 400,
              message: "Erro de validação",
              errors: ["Permissão ADMIN não pode ser desativada"]
            }
          }

          if (permissionExist.disabledAt == null) {
            const newPermission = await this.repo.save({
              ...permissionExist,
              disabledAt: new Date(),
              Profiles: undefined,
              Users: undefined
            })


            return {
              success: true,
              status: 200,
              message: "Permissão desativada com sucesso.",
              data: { permission: newPermission }
            }

          } else {

            const newPermission = await this.repo.save({
              ...permissionExist,
              disabledAt: null,
              Profiles: undefined,
              Users: undefined
            })

            return {
              success: true,
              status: 200,
              message: "Permissão ativada com sucesso.",
              data: { permission: newPermission }
            }
          }
        }

      }

    } else {
      //usuário não informado - logar e retornar com erro
      await this.saveAudit.execute({
        moduleName: "PERMISSION",
        useCase: "TogglePermission",
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