import { Id } from "./Id"

export interface EntityProps {
  id?: string | number               //string | number | null,
  createdAt?: Date | null,
  updatedAt?: Date | null,
  disabledAt?: Date | null
}

export default abstract class Entity<EntityType, Props extends EntityProps> {
  readonly id: string | number
  readonly props?: Props
  readonly createdAt?: Date | null
  readonly updatedAt?: Date | null
  readonly disabledAt?: Date | null

  constructor(props: Props) {
    this.id = props.id
    this.props = { ...props, id: this.id }
    this.createdAt = props.createdAt ? props.createdAt : null
    this.updatedAt = props.updatedAt ? props.updatedAt : null
    this.disabledAt = props.disabledAt ? props.disabledAt : null
  }

}