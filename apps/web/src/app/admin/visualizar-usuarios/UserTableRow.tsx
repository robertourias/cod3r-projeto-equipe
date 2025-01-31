import { UserProps } from "@repo/core";
import Users from "../../../../../api/dist/model/users";
import { poppins200, poppins400 } from "../../../utils/loadFont";

interface UserTableRowProps {
  usersList: UserProps[];
  foundUser: UserProps | undefined;
}
export default function UserTableRow(props: UserTableRowProps) {

  const objToArray: any = Array(props.usersList);
  console.log(objToArray)

  return (
    <tbody className="">
      <>
        {props.foundUser === undefined && props.usersList.length > 0 &&
          (
            props.usersList.map((user, i: number) => {
              return (
                <tr className="" key={i}>
                  <td className={`${poppins200.className} opacity-25 p-1`}>{user.name}</td>
                  <td className={`${poppins400.className} border-solid border-2 border-sky-500 rounded-xl p-1`}>{''}</td>
                  <td className={`${poppins200.className} opacity-25 p-1`}>A{''}</td>
                  <td className={`${poppins200.className} opacity-25 p-1`}>{user.workingHours}</td>
                </tr>
              )
            })
          )
        }
        {props.foundUser &&
          (
            <tr className="" key={0}>
              <td className={`${poppins200.className} opacity-25 p-1`}>{props.foundUser.name}</td>
              <td className={`${poppins400.className} border-solid border-2 border-sky-500 rounded-xl p-1`}>{''}</td>
              <td className={`${poppins200.className} opacity-25 p-1`}>A{''}</td>
              <td className={`${poppins200.className} opacity-25 p-1`}>{props.foundUser.workingHours}</td>
            </tr>
          )
        }
        {Object.keys(props.usersList).length && (
          <tr className="" key={0}>
            <td className={`${poppins200.className} opacity-25 p-1`}>{objToArray[0].name}</td>
            <td className={`${poppins400.className} border-solid border-2 border-sky-500 rounded-xl p-1`}>{''}</td>
            <td className={`${poppins200.className} opacity-25 p-1`}>A{''}</td>
            <td className={`${poppins200.className} opacity-25 p-1`}>{objToArray[0].workingHours}</td>
          </tr>
        )}
      </>
    </tbody>
  )
}