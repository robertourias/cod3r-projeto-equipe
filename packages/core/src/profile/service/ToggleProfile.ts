import { AuditRepository } from "../../audit"
import { SaveAudit } from "../../audit/service/SaveAudit"
import { CoreResponse } from "../../common/CoreResponse"
import { UseCase } from "../../common/UseCase"
import { UserProps } from "../../user"
import { ProfileRepository } from "../provider/ProfileRepository"

export class ToggleProfile implements UseCase<string, CoreResponse> {

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
            useCase: "ToggleProfile",
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

        if (!profileExist) {
          return {
            success: false,
            status: 400,
            message: "Erro de validação",
            errors: ["Perfil não encontrado com Id:" + id]
          }

        } else {

          if (profileExist.name === "ADMIN") {
            return {
              success: false,
              status: 400,
              message: "Erro de validação",
              errors: ["Perfil ADMIN não pode ser desativado"]
            }
          }

          if (profileExist.disabledAt == null) {
            const newProfile = await this.repo.save({
              ...profileExist,
              disabledAt: new Date(),
              Permissions: undefined,
              Users: undefined
            })


            return {
              success: true,
              status: 200,
              message: "Perfil desativado com sucesso.",
              data: { profile: newProfile }
            }

          } else {

            const newProfile = await this.repo.save({
              ...profileExist,
              disabledAt: null,
              Permissions: undefined,
              Users: undefined
            })

            return {
              success: true,
              status: 200,
              message: "Perfil ativado com sucesso.",
              data: { profile: newProfile }
            }
          }
        }

      }

    } else {
      //usuário não informado - logar e retornar com erro
      await this.saveAudit.execute({
        moduleName: "PROFILE",
        useCase: "ToggleProfile",
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