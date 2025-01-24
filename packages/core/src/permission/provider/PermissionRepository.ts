import { ProfileProps } from "../../profile"
import { UserProps } from "../../user"
import { PermissionProfileProps } from "../model/PermissionProfileProps"
import { PermissionProps } from "../model/PermissionProps"
import { PermissionUserProps } from "../model/PermissionUserProps"

export interface PermissionRepository {
  save(permission: PermissionProps): Promise<PermissionProps>
  findById(id: string): Promise<PermissionProps | null>
  findByName(name: string): Promise<PermissionProps | null>
  findAll(): Promise<PermissionProps[]>
  delete(id: number): Promise<PermissionProps>
  userHasPermission(userId: string, permissionName: string): Promise<boolean>
  findUserByEmail(email: string): Promise<UserProps>

  findProfileById(id: string): Promise<ProfileProps | null>
  findPermissionOnProfile(permissionId: number, profileId: number): Promise<PermissionProfileProps | null>
  addPermissionToProfile(permissionId: number, profileId: number): Promise<PermissionProfileProps | null>
  removePermissionFromProfile(permissionId: number, profileId: number): Promise<PermissionProfileProps | null>

  findUserById(id: string): Promise<UserProps | null>
  findPermissionOnUser(permissionId: number, userId: string): Promise<PermissionUserProps | null>
  addPermissionToUser(permissionId: number, userId: string): Promise<PermissionUserProps | null>
  removePermissionFromUser(permissionId: number, userId: string): Promise<PermissionUserProps | null>
}