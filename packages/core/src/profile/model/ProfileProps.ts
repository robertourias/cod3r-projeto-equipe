import { EntityProps } from "../../common/Entity"

export interface ProfileProps extends EntityProps {
  name?: string
  description?: string,
  Permissions?: any[],
  Users?: any[]
}