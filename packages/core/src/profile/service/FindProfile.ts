import { AuditRepository } from "../../audit"
import { SaveAudit } from "../../audit/service/SaveAudit"
import { CoreResponse } from "../../common/CoreResponse"
import { UseCase } from "../../common/UseCase"
import { PermissionRepository } from "../../permission"
import { UserProps } from "../../user"
import { ProfileRepository } from "../provider/ProfileRepository"

export class FindProfile implements UseCase<string | null, CoreResponse> {

  private readonly saveAudit: SaveAudit

  constructor(
    private readonly repo: ProfileRepository,
    private readonly auditRepo: AuditRepository,
    private readonly permissionRepo: PermissionRepository
  ) {
    this.saveAudit = new SaveAudit(this.auditRepo)
  }

  async execute(id?: string, user?: UserProps): Promise<CoreResponse> {

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
        const userHasPermission = await this.permissionRepo.userHasPermission(userDB.id.toString(), "FIND_PROFILE")
        
        if(!userHasPermission){
          return {
            success: false,
            status: 401,
            message: "Não autorizado: visualizar perfil",
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

        if (id) {
          return await this.findById(id, { ...userDB, host: host, userAgent: userAgent })
        } else {
          return await this.findAll({ ...userDB, host: host, userAgent: userAgent })
        }

      }

    } else {
      //usuário não informado - logar e retornar com erro
      await this.saveAudit.execute({
        moduleName: "PROFILE",
        useCase: "FindProfile",
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



  private async findById(id: string, user: UserProps): Promise<CoreResponse> {

    const result = await this.repo.findById(id)

    if (result) {

      await this.saveAudit.execute({
        moduleName: "PROFILE",
        useCase: "FindProfile.findById",
        message: "Consulta usuário",
        userId: user.id,
        requestData: JSON.stringify({ id }),
        responseData: JSON.stringify({ profile: result }),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: true,
        status: 200,
        data: result
      }

    } else {

      await this.saveAudit.execute({
        moduleName: "PROFILE",
        useCase: "FindProfile.findById",
        message: "Erro de validação",
        userId: user.id,
        requestData: JSON.stringify({ id }),
        responseData: JSON.stringify("Perfil não encontrado"),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: false,
        status: 400,
        message: "Perfil não encontrado",
        data: result
      }
    }

  } //findById


  private async findAll(user: UserProps): Promise<CoreResponse> {

    const result = await this.repo.findAll()

    if (result.length > 0) {

      await this.saveAudit.execute({
        moduleName: "PROFILE",
        useCase: "FindProfile.findAll",
        message: "Consulta todos perfis",
        userId: user.id,
        responseData: JSON.stringify("Result omitted."),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: true,
        status: 200,
        data: result
      }

    } else {

      await this.saveAudit.execute({
        moduleName: "PROFILE",
        useCase: "FindProfile.findAll",
        message: "Nenhum perfil encontrado",
        userId: user.id,
        responseData: JSON.stringify("Result omitted."),
        host: user?.host,
        userAgent: user?.userAgent
      })

      return {
        success: false,
        status: 400,
        message: "Nenhum perfil encontrado",
        data: result
      }
    }

  } //findAll


}