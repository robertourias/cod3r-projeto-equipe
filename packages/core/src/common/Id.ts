import { v4 as uuid, validate } from "uuid"

export class Id {

  readonly value: string

  constructor(value?: string) {
    this.value = value ?? uuid()
    if (!validate(value)) throw new Error("INVALID_ID")
  }

}