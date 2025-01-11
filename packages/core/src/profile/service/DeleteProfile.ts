import { AuditRepository } from "../../audit"
import { SaveAudit } from "../../audit/service/SaveAudit"
import { CoreResponse } from "../../common/CoreResponse"
import { UseCase } from "../../common/UseCase"
import { UserProps } from "../../user"
import { ProfileRepository } from "../provider/ProfileRepository"

export class DeleteProfile implements UseCase<string, CoreResponse> {

  private readonly saveAudit: SaveAudit

  constructor(
    private readonly repo: ProfileRepository,
    private readonly auditRepo: AuditRepository
  ) {
    this.saveAudit = new SaveAudit(this.auditRepo)
  }


  async execute(id: string, user?: UserProps): Promise<CoreResponse> {

    // console.log("ToggleProfile: ", id, user)

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

        //TODO: validar aqui se 'usuario' tem permissão para executar esse caso de uso

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
            useCase: "DeleteProfile",
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


        const profileExist = await this.repo.findById(id)

        // console.debug("profileExist:", JSON.stringify(profileExist, null, 2))

        if (!profileExist) {
          return {
            success: false,
            status: 400,
            message: "Erro de validação",
            errors: ["Perfil não encontrado com Id: " + id]
          }

        } else {

          //proteção para não excluir o perfil ADMIN
          if (profileExist.name === "ADMIN") {
            return {
              success: false,
              status: 400,
              message: "Erro",
              errors: ["Perfil ADMIN não pode ser excluido"]
            }
          }

          //verifica se o perfil possui usuários vinculados
          if (profileExist.Users.length > 0) {
            console.log(profileExist.Users)
            const linkedUser = profileExist.Users.map((userProfile) => {
              return userProfile.User.name
            })
            return {
              success: false,
              status: 400,
              message: "Erro na exclusão",
              errors: [`Perfil \'${profileExist.name}\' possui usuários vinculados`, ...linkedUser]
            }
          }

          //Permissões não dependem do perfil,
          // if (profileExist.Permissions.length > 0) {
          //   const linkedPermission = profileExist.Permissions.map((profilePermission) => {
          //     return profilePermission.Permission.name
          //   })
          //   // console.log(linkedPermission)
          //   return {
          //     success: false,
          //     status: 400,
          //     message: "Erro na exclusão",
          //     errors: [`Perfil \'${profileExist.name}\' possui permissões vinculadas`, ...linkedPermission]
          //   }
          // }

          const result = await this.repo.delete(+profileExist.id)

          if (result) {
            return {
              success: true,
              status: 200,
              message: "Perfil excluido com sucesso.",
              data: { profile: profileExist }
            }
          }

        }

      }

    } else {
      //usuário não informado - logar e retornar com erro
      await this.saveAudit.execute({
        moduleName: "PROFILE",
        useCase: "DeleteProfile",
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