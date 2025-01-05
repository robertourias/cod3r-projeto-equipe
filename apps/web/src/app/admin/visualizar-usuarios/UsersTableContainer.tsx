import UserTableRow from "./UserTableRow";
import { useContext } from "react";
import { GeneralContext } from "../../context/context";

interface UsersTableContainerProps {
  children?: any;
}

export default function UsersTableContainer(props: UsersTableContainerProps) {
  const { usersList } = useContext(GeneralContext);

  return (
    <div className="">
      <table className="w-4/5 mx-auto">
        <thead className="bg-[#27272A] ">
          <tr>
            <th>Nome</th>
            <th>Perfil</th>
            <th>Ativo</th>
            <th>Horário de Trabalho</th>
            <th>Dias de Trabalho</th>
          </tr>
        </thead>
        <UserTableRow usersList={usersList} />
      </table>
    </div>
  )
}