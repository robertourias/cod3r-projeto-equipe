import { AuditRepository } from "../../audit"
import { SaveAudit } from "../../audit/service/SaveAudit"
import { CoreResponse } from "../../common/CoreResponse"
import { UseCase } from "../../common/UseCase"
import { UserProps } from "../../user"
import { PermissionProfileProps } from "../model/PermissionProfileProps"
import { PermissionRepository } from "../provider/PermissionRepository"

export class AddPermissionToProfile implements UseCase<PermissionProfileProps, CoreResponse> {

  private readonly saveAudit: SaveAudit

  constructor(
    private readonly repo: PermissionRepository,
    private readonly auditRepo: AuditRepository
  ) {
    this.saveAudit = new SaveAudit(this.auditRepo)
  }


  async execute(data: PermissionProfileProps, user?: UserProps): Promise<CoreResponse> {

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

        const userHasPermission = await this.repo.userHasPermission(userDB.id.toString(), "ADD_PERMISSION_PROFILE")
        if (!userHasPermission) {
          return {
            success: false,
            status: 401,
            message: "Não autorizado: vincular permissão a perfil",
          }
        }

        //Validação dos dados
        const errors: string[] = []

        //ID undefined gera erro prisma
        if (!data.permissionId) {
          errors.push("ID da permissão precisa ser informado")
        }
        if (!data.profileId) {
          errors.push("ID do perfil precisa ser informado")
        }

        if (errors.length > 0) {
          await this.saveAudit.execute({
            moduleName: "PERMISSION",
            useCase: "AddPermissionToProfile",
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
        const profileExist = await this.repo.findProfileById(data.profileId.toString())

        //verifica se já existe o vinculo
        const permissionExistOnProfile = await this.repo.findPermissionOnProfile(data.permissionId, data.profileId)

        if (!permissionExist) {
          errors.push("Permissão não encontrada: " + data.permissionId)
        }

        if (!profileExist) {
          errors.push("Perfil não encontrado: " + data.profileId)
        }

        if (permissionExistOnProfile) {
          errors.push(`Permissão \'${permissionExistOnProfile?.Permission?.name}\' já vinculada ao perfil \'${permissionExistOnProfile?.Profile?.name}\' `)
        }

        if (errors.length > 0) {
          return {
            success: false,
            status: 400,
            message: "Não é possível vincular a permissão ao perfil",
            errors: [...errors]
          }
        }

        const newPermissionOnProfile = await this.repo.addPermissionToProfile(data.permissionId, data.profileId)

        return {
          success: true,
          status: 200,
          message: "Permissão vinculada ao perfil com sucesso.",
          data: { ...newPermissionOnProfile }
        }

      }


    } else {
      //usuário não informado - logar e retornar com erro
      await this.saveAudit.execute({
        moduleName: "PERMISSION",
        useCase: "AddPermissionToProfile",
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