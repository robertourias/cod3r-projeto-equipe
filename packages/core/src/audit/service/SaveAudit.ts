import { UseCase } from "../../common/UseCase";
import { AuditProps } from "../model/AuditProps";
import { AuditRepository } from "../provider/AuditRepository";

export class SaveAudit implements UseCase<AuditProps, void> {

  constructor(
    private readonly repo: AuditRepository
  ) { }

  async execute(data: AuditProps) {
    console.log("AUDIT: ", data)
  }

}