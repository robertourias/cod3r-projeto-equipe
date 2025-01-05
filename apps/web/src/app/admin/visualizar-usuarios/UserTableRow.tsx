import Users from "../../../../../api/dist/model/users";

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
              <td className="">{user.nome_funcionario}</td>
              <td className="">{user.perfil_usuario}</td>
              <td className="">A{user.ativo}</td>
              <td className="">{user.horario_trabalho}</td>
              <td className="">{user.dias_trabalho}</td>
            </tr>
          )
        })}
    </tbody>
  )
}

