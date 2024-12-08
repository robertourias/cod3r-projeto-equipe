import { UseCase } from "../../common/UseCase";
import { UserProps, UserRepository } from "../../user";

export class RecoverPassword implements UseCase<UserProps, UserProps> {
  constructor(
    private readonly repo: UserRepository,
  ) { }
  execute(data: UserProps, user?: UserProps): Promise<UserProps> {
    throw new Error("Method not implemented.");
  }
}