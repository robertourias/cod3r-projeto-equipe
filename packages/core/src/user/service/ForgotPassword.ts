import { UseCase } from "../../common/UseCase";
import { UserProps, UserRepository } from "../../user";

export class ForgotPassword implements UseCase<string, UserProps> {
  constructor(
    private readonly repo: UserRepository,
  ) { }
  async execute(email: string, user?: UserProps): Promise<UserProps> {
    const userExists = await this.repo.findByEmail(email);
    return userExists;
  }
}