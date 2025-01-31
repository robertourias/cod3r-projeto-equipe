import { ProfileProps } from "@repo/core";
import { poppins200, poppins400 } from "../../../utils/loadFont";

interface ProfileTableRowProps {
  profileList: ProfileProps[];
  foundProfile: ProfileProps | undefined;
}
export default function ProfileTableRow(props: ProfileTableRowProps) {

  // const objToArray: any = Array(props.profileList);

  // console.log("props.profileList:", props.profileList)

  return (
    <tbody className="">
      {props.foundProfile === undefined && props.profileList?.length > 0 &&
        (
          props.profileList.map((profile, i: number) => {
            return (
              <tr className="h-10" key={i}>
                <td className={`${poppins200.className} opacity-25 p-1 text-center`}>{profile.name}</td>
                <td className={`${poppins200.className} opacity-25 p-1 text-center`}>{profile.disabledAt == null ? "Ativo" : "Inativo"}{''}</td>
                <td className={`${poppins200.className} opacity-25 p-1 text-center`}>{profile.description}</td>
                <td className={`${poppins400.className} flex flex-wrap gap-2`}>
                  {profile.Permissions && profile.Permissions?.length > 0 && profile.Permissions?.map((permission) => {
                    //TODO: ver porque não reconheceu o "PROFILE" dentro do array
                    //TODO: melhorar separador quando tem mais perfis vinculados ao mesmo usuário - usando espaço simples provisóriamente
                    return <p className="border-solid border border-sky-800 rounded-lg px-2 py-1 text-center text-xs ">{permission.Permission.name}</p>
                  })}
                  {profile.Permissions?.length == 0 && "-"}
                </td>
              </tr>
            )
          })
        )
      }
      {props.foundProfile &&
        (
          <tr className="" key={0}>
            <td className={`${poppins200.className} opacity-25 p-1`}>{props.foundProfile.name}</td>
            <td className={`${poppins200.className} opacity-25 p-1`}>{props.foundProfile.disabledAt == null ? "Ativo" : "Inativo"}{''}</td>
            <td className={`${poppins200.className} opacity-25 p-1`}>{props.foundProfile.description}</td>
            <td className={`${poppins400.className} border-solid border-2 border-sky-700 rounded-xl p-1`}>{''}</td>
          </tr>
        )
      }
      {/* {Object.keys(props.usersList).length && (
        <tr className="" key={0}>
          <td className={`${poppins200.className} opacity-25 p-1`}>{objToArray[0].name}</td>
          <td className={`${poppins400.className} border-solid border-2 border-sky-500 rounded-xl p-1`}>{''}</td>
          <td className={`${poppins200.className} opacity-25 p-1`}>A{''}</td>
          <td className={`${poppins200.className} opacity-25 p-1`}>{objToArray[0].workingHours}</td>
        </tr>
      )} */}
    </tbody>
  )
}