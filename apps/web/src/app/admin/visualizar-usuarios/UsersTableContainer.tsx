import UserTableRow from "./UserTableRow";
import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/context";
import { poppins600 } from "../../../utils/loadFont";
import { UserProps } from "@repo/core";
import SearchBar from "./SearchBar";
import Link from "next/link";
// import Users from "../../../../../api/dist/model/users";

interface UsersTableContainerProps {
  children?: any;
}

export default function UsersTableContainer(props: UsersTableContainerProps) {
  const { formData, usersList, setUsersList, token, selectedUser, userName } = useContext(GeneralContext);

  console.log("userName", userName)

  useEffect(() => {

    if (formData.email === "admin@zmail.com.br") {
      fetch('http://localhost:3333/users', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setUsersList(data.data);
        });
    } else {
      fetch(`http://localhost:3333/users/${selectedUser?.id}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          setUsersList([data.data]);
        });
    }
  }, []);

  let foundUser: UserProps | undefined = undefined;

  if (usersList) {
    foundUser = usersList.find((user: UserProps) => {
      return user.name === userName;
    });
  }

  return (
    <div className="flex flex-col gap-2 p-6">
      <div className="flex justify-end items-center w-full">
        <SearchBar />
        <Link href="/admin/criar-usuario" className="flex justify-center items-center w-24 bg-green-600 font-semibold p-2 rounded-lg text-white h-10">Novo</Link>
      </div>
      <table className="w-full mx-auto border-separate border-spacing-y-1">
        <thead className="bg-[#27272A] h-10">
          <tr>
            <th className={`${poppins600.className}`}>Nome</th>
            <th className={`${poppins600.className}`}>Ativo</th>
            <th className={`${poppins600.className}`}>Horário de Trabalho</th>
            <th className={`${poppins600.className}`}>Perfil</th>
          </tr>
        </thead>
        <UserTableRow usersList={usersList} foundUser={foundUser} />
      </table>
    </div>
  )
}