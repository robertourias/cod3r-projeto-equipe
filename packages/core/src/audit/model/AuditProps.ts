import { EntityProps } from "../../common/Entity";
import { UserProps } from "../../user";

export interface AuditProps extends EntityProps {

  moduleName?: string,
  useCase?: string,
  User?: UserProps,
  userId?: string | number,
  message?: string,
  requestData?: any,
  responseData?: any,
  beforeUpdate?: any,
  host?: string,
  userAgent?: string

}