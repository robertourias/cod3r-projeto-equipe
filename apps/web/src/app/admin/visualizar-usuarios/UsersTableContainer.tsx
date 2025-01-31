import UserTableRow from "./UserTableRow";
import { useContext, useEffect } from "react";
import { GeneralContext } from "../../context/context";
import { poppins600 } from "../../../utils/loadFont";
import { UserProps } from "@repo/core";
// import Users from "../../../../../api/dist/model/users";

interface UsersTableContainerProps {
  children?: any;
}

export default function UsersTableContainer(props: UsersTableContainerProps) {
  const { formData, usersList, setUsersList, userName, token } = useContext(GeneralContext);

  useEffect(() => {
    console.log("FORM DATA TABLE", formData)

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
          console.log("DATA ADMIN", data.data);
          setUsersList(data.data);
        });
    } else {
      fetch('http://localhost:3333/auth/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.confirmPassword,
          token: token
        })
      })
        .then(response => response.json())
        .then(data => {
          console.log("DATA DATA", data.data);
          if (data.data.user) {
            setUsersList(data.data.user);
          } else {
            setUsersList(data.data);
          }
        });
    }
  }, []);

  console.log("usersList", usersList, "TOKEN", token, "formData", formData);

  let foundUser: UserProps | undefined = undefined;

  // if (usersList) {
  //   foundUser = usersList.find((user: UserProps) => {
  //     return user.name === userName;
  //   });
  // }

  return (
    <div className="">
      <table className="w-4/5 mx-auto border-separate border-spacing-y-1">
        <thead className="bg-[#27272A] ">
          <tr>
            <th className={`${poppins600.className}`}>Nome</th>
            <th className={`${poppins600.className}`}>Perfil</th>
            <th className={`${poppins600.className}`}>Ativo</th>
            <th className={`${poppins600.className}`}>Horário de Trabalho</th>
          </tr>
        </thead>
        <UserTableRow usersList={usersList} foundUser={foundUser} />
      </table>
    </div>
  )
}