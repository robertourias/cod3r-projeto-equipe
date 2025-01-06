import UserTableRow from "./UserTableRow";
import { useContext } from "react";
import { GeneralContext } from "../../context/context";
import { poppins600 } from "../../../utils/loadFont";

interface UsersTableContainerProps {
  children?: any;
}

export default function UsersTableContainer(props: UsersTableContainerProps) {
  const { usersList } = useContext(GeneralContext);

  return (
    <div className="">
      <table className="w-4/5 mx-auto border-separate border-spacing-y-1">
        <thead className="bg-[#27272A] ">
          <tr>
            <th className={`${poppins600.className}`}>Nome</th>
            <th className={`${poppins600.className}`}>Perfil</th>
            <th className={`${poppins600.className}`}>Ativo</th>
            <th className={`${poppins600.className}`}>Horário de Trabalho</th>
            <th className={`${poppins600.className}`}>Dias de Trabalho</th>
          </tr>
        </thead>
        <UserTableRow usersList={usersList} />
      </table>
    </div>
  )
}