import { UseCase } from "../../common/UseCase";
import { AuditProps } from "../model/AuditProps";
import { AuditRepository } from "../provider/AuditRepository";

export class SaveAudit implements UseCase<AuditProps, void> {

  constructor(
    private readonly repo: AuditRepository
  ) { }

  async execute(data: AuditProps) {

    // console.log("SaveAudit.execute() - DATA:", data)
    try {
      //remover senha dos campos requestData/responseData
      let requestData = undefined
      let responseData = undefined

      if (data.requestData) {
        requestData = JSON.parse(data.requestData)
        if (requestData.password) {
          delete requestData.password
        }
      }

      if (data.responseData) {
        responseData = JSON.parse(data.responseData)
        if (responseData.password) {
          delete responseData.password
        }
      }

      const filteredData = {
        ...data,
        requestData: JSON.stringify(requestData),
        responseData: JSON.stringify(responseData)
      }

      this.repo.save(filteredData)

    } catch (error) {
      console.log("ERROR SaveAudit.execute(): ", error)
      throw new Error("Erro interno.", { cause: error })
    }
  }

}