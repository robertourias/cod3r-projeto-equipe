import { UserProps } from '../model/UserProps'

export interface UserRepository {
  save(user: UserProps, withPassword?: boolean): Promise<UserProps>
  findByEmail(email: string, withPassword?: boolean): Promise<UserProps | null>
  findById(id: string, withPassword?: boolean): Promise<UserProps | null>
  findAll(withPassword?: boolean): Promise<UserProps[]>
  delete(id: string): Promise<UserProps>
  addProfile(profileId: number, userId: string): Promise<any>
}