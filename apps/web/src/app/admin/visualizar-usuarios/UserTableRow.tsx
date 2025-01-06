import Users from "../../../../../api/dist/model/users";
import { poppins200, poppins400 } from "../../../utils/loadFont";

interface UserTableRowProps {
  usersList: Users[];
}
export default function UserTableRow(props: UserTableRowProps) {

  return (
    <tbody className="">
      {
        props.usersList.map((user, i: number) => {
          return (
            <tr className="" key={i}>
              <td className={`${poppins200.className} opacity-25 p-1`}>{user.nome_funcionario}</td>
              <td className={`${poppins400.className} border-solid border-2 border-sky-500 rounded-xl p-1`}>{user.perfil_usuario}</td>
              <td className={`${poppins200.className} opacity-25 p-1`}>A{user.ativo}</td>
              <td className={`${poppins200.className} opacity-25 p-1`}>{user.horario_trabalho}</td>
              <td className={`${poppins200.className} opacity-25 p-1`}>{user.dias_trabalho}</td>
            </tr>
          )
        })}
    </tbody>
  )
}

