import { AuditRepository } from "../../audit";
import { SaveAudit } from "../../audit/service/SaveAudit";
import { CoreResponse } from "../../common/CoreResponse";
import { UseCase } from "../../common/UseCase";
import { UserProps, UserRepository } from "../../user";

export class LogoutUser implements UseCase<string, CoreResponse> {

  private readonly auditSave: SaveAudit

  constructor(
    private readonly repo: UserRepository,
    private readonly auditRepo: AuditRepository
  ) {
    this.auditSave = new SaveAudit(this.auditRepo)
  }

  async execute(data: string, user?: UserProps): Promise<CoreResponse> {

    //validar algo do usuário?

    // console.log(data)

    //somente registra o logout
    this.auditSave.execute({
      moduleName: "AUTH",
      useCase: "LogoutUser",
      message: "Logout realizado com sucesso.",
      requestData: JSON.stringify(data),
      host: user.host,
      userAgent: user.userAgent
    })

    return {
      success: true,
      status: 200,
      message: "Logout realizado com sucesso."
    }

  }

}