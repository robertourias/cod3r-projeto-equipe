import { User, UserProps } from '@repo/core'

export default class UserConverter {

  toDTO(value: User | User[]): UserProps {

    if (Array.isArray(value)) {

      const users = []

      if (value.length > 0) {
        const converter = new UserConverter()
        value.forEach(user => {
          // delete user.props
          users.push(this.userToDTO(user))
        })
      }

    } else {
      return this.userToDTO(value)
    }

  }

  toUser(user: UserProps): User {
    console.log(user)
    return new User(user)
  }

  private userToDTO(user: User): UserProps {
    return {
      id: user.id.value,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      disabledAt: user.disabledAt
    }
  }

}