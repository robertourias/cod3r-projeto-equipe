export interface AuditRepository {
  save(data: any): Promise<void>
}