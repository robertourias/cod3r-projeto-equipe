import { UseCase } from "../../common/UseCase";
import { UserProps } from "../../user";

export class LogoutUser implements UseCase<UserProps, UserProps> {
  execute(data: UserProps, user?: UserProps): Promise<UserProps> {
    throw new Error("Method not implemented.");
  }
}