import { UserProps } from "../user";

export interface UseCase<IN, OUT> {
  execute(data: IN, user?: UserProps, reqHeaders?: any): Promise<OUT>
}