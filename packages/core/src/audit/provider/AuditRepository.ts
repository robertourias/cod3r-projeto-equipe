import { AuditProps } from "../model/AuditProps";

export interface AuditRepository {
  save(data: AuditProps): Promise<void>
}