import { UserProps } from "../../user"
import { PermissionProps } from "../model/PermissionProps"

export interface PermissionRepository {
  save(permission: PermissionProps): Promise<PermissionProps>
  findById(id: string): Promise<PermissionProps | null>
  findByName(name: string): Promise<PermissionProps | null>
  findAll(): Promise<PermissionProps[]>
  delete(id: number): Promise<PermissionProps>
  userHasPermission(userId: string, permissionName: string): Promise<boolean>
  findUserByEmail(email: string): Promise<UserProps>
}