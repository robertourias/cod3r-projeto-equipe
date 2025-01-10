import { AuditRepository } from "../../audit"
import { SaveAudit } from "../../audit/service/SaveAudit"
import { CoreResponse } from "../../common/CoreResponse"
import { UseCase } from "../../common/UseCase"
import { isValidName } from "../../common/Validations"
import { UserProps } from "../../user"
import { ProfileProps } from "../model/ProfileProps"
import { ProfileRepository } from "../provider/ProfileRepository"

export class UpdateProfile implements UseCase<ProfileProps, CoreResponse> {

  private readonly saveAudit: SaveAudit

  constructor(
    private readonly repo: ProfileRepository,
    private readonly auditRepo: AuditRepository
  ) {
    this.saveAudit = new SaveAudit(this.auditRepo)
  }


  async execute(data: ProfileProps, user?: UserProps): Promise<CoreResponse> {

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

        //TODO: validar aqui se 'usuario' tem permissão para executar esse caso de uso

        //Validação dos dados
        const errors: string[] = []

        //ID undefined gera erro prisma
        if (!data.id) {
          errors.push("ID precisa ser informado")
        }

        //Validação dos campos obrigatórios
        if (!isValidName(data.name, 5, 20)) {
          errors.push("Nome deve ser informado e ter de 5 a 20 caracteres. ")
        }

        if (data.description.length < 5) {
          errors.push("Descrição precisa ter no mínimo 5 caracteres")
        }

        if (errors.length > 0) {
          await this.saveAudit.execute({
            moduleName: "PROFILE",
            useCase: "CreateProfile",
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


        const profileExist = await this.repo.findById(data.id.toString())

        if (!profileExist) {
          return {
            success: false,
            status: 400,
            message: "Erro de validação",
            errors: ["Perfil não encontrado: " + data.name.toUpperCase(), "Não é possível atualizar"]
          }

        } else {
          const newProfile = await this.repo.save({
            ...data,
            name: data.name.toUpperCase(),
          })

          return {
            success: true,
            status: 200,
            message: "Perfil atualizado com sucesso.",
            data: { profile: newProfile }
          }
        }

      }

    } else {
      //usuário não informado - logar e retornar com erro
      await this.saveAudit.execute({
        moduleName: "PROFILE",
        useCase: "CreateProfile",
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