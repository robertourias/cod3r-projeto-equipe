import { EntityProps } from "../../common/Entity"

export interface PermissionUserProps extends EntityProps {
  permissionId: number
  userId: string,
  Permission?: any,
  User?: any,
}