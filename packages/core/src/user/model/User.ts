import { EntityProps } from "../../common/Entity"

export interface UserProps extends EntityProps {
  name?: string
  email?: string
  password?: string,
  phone?: string,
  profileUrl?: string,
  recoveryToken?: string,
  tokenExpiration?: string,
  twoFactorAuth?: boolean,
  UserPermission?: [],
  UserProfile?: []
}

// export class User extends Entity<User, UserProps> {

//   readonly name: string | null      //SimpleName | null
//   readonly email: string            //Email | null
//   readonly password?: string | null //PasswordHash | null
  
//   constructor(props: UserProps) {
//     super(props)
//     this.email = props.email
//     this.password = props.password  //? new PasswordHash(props.password) : null
//     this.name = props.name          //? new SimpleName(props.name) : null
//   }

// }