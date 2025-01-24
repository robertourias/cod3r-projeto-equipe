import { EntityProps } from "../../common/Entity"

export interface PermissionProfileProps extends EntityProps {
  permissionId: number
  profileId: number,
  Permission?: any,
  Profile?: any,
}