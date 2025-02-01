import { UserProps } from "@repo/core";
import { poppins200, poppins400 } from "../../../utils/loadFont";

interface UserTableRowProps {
  usersList: UserProps[];
  foundUser: UserProps | undefined;
}
export default function UserTableRow(props: UserTableRowProps) {

  const objToArray: any = Array(props.usersList);
  // console.log(objToArray`

  return (
    <tbody className="">
      {props.foundUser === undefined && props.usersList.length > 0 &&
        (
          props.usersList.map((user, i: number) => {
            return (
              <tr className="h-10" key={i}>
                <td className={`${poppins200.className} opacity-25 p-1 text-center`}>{user.name}</td>
                <td className={`${poppins200.className} opacity-25 p-1 text-center`}>{user.disabledAt == null ? "Ativo" : "Inativo"}{''}</td>
                <td className={`${poppins200.className} opacity-25 p-1 text-center`}>{user.workingHours}</td>
                <td className={`${poppins400.className} flex flex-wrap gap-2`}>
                  {user.Profiles && user.Profiles?.length > 0 && user.Profiles?.map((profile) => {
                    //TODO: ver porque não reconheceu o "PROFILE" dentro do array
                    //TODO: melhorar separador quando tem mais perfis vinculados ao mesmo usuário - usando espaço simples provisóriamente
                    return <p className="border-solid border border-sky-800 rounded-lg px-2 py-1 text-center text-xs ">{profile.Profile?.name}</p>
                  })}

                  {user.Profiles?.length == 0 && "-"}

                </td>

              </tr>
            )
          })
        )
      }
      {props.foundUser &&
        (
          <tr className="" key={0}>
            <td className={`${poppins200.className} opacity-25 p-1`}>{props.foundUser.name}</td>
            <td className={`${poppins200.className} opacity-25 p-1`}>{props.foundUser.disabledAt == null ? "Ativo" : "Inativo"}{''}</td>
            <td className={`${poppins200.className} opacity-25 p-1`}>{props.foundUser.workingHours}</td>
            <td className={`${poppins400.className} border-solid border-2 border-sky-700 rounded-xl p-1`}>
              {props.foundUser.Profiles && props.foundUser.Profiles?.length > 0 && props.foundUser.Profiles?.map((profile) => {
                //TODO: ver porque não reconheceu o "PROFILE" dentro do array
                //TODO: melhorar separador quando tem mais perfis vinculados ao mesmo usuário - usando espaço simples provisóriamente
                return <p className="border-solid border border-sky-800 rounded-lg px-2 py-1 text-center text-xs ">{profile.Profile?.name}</p>
              })}

              {props.foundUser.Profiles?.length == 0 && "-"}
            </td>
          </tr>
        )
      }
    </tbody>
  )
}