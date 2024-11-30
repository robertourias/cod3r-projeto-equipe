import { UserProps } from '../model/User'

export interface UserRepository {
  save(user: UserProps): Promise<UserProps>
  delete(id: string): Promise<UserProps>
  findByEmail(email: string): Promise<UserProps | null>
  findById(id: string): Promise<UserProps | null>
  findAll(): Promise<UserProps[]>
}