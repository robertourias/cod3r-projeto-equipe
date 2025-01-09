import { UserProps } from "../../user"
import { ProfileProps } from "../model/ProfileProps"

export interface ProfileRepository {
  save(profile: ProfileProps): Promise<ProfileProps>
  findById(id: string): Promise<ProfileProps | null>
  findByName(name: string): Promise<ProfileProps | null>
  findAll(): Promise<ProfileProps[]>
  delete(id: number): Promise<ProfileProps>
  findUserByEmail(email: string): Promise<UserProps>
}