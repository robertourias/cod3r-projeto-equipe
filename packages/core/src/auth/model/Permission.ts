import { EntityProps } from "../../common/Entity"

export interface PermissionProps extends EntityProps {
  name?: string
  description?: string
  ProfilePermission?: [],
  UserPermission?: []
}