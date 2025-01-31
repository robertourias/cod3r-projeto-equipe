import ProfileTableRow from "./ProfileTableRow";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "../../context/context";
import { poppins600 } from "../../../utils/loadFont";
import { ProfileProps, UserProps } from "@repo/core";
import SearchBar from "./SearchBar";
import Link from "next/link";
// import Users from "../../../../../api/dist/model/users";

interface ProfileTableContainerProps {
  children?: any;
}

export default function ProfileTableContainer(props: ProfileTableContainerProps) {
  const { formData, usersList, setUsersList, token, selectedUser } = useContext(GeneralContext);

  const [profileList, setProfileList] = useState<ProfileProps[]>([])

  useEffect(() => {
    // console.log("selectedUser", selectedUser)

    if (formData.email === "admin@zmail.com.br") {
      fetch('http://localhost:3333/profile', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => {
          // console.log("ProfileTableContainer data", data.data);
          setProfileList(data.data);
        });
    } 
    // else {
    //   fetch(`http://localhost:3333/users/${selectedUser?.id}`, {
    //     method: "GET",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer ${token}`
    //     }
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       // console.log("DATA DATA", data);
    //       setUsersList([data.data]);
    //     });
    // }
  }, []);

  // console.log("usersList", usersList, "TOKEN", token, "formData", formData);

  let foundProfile: ProfileProps | undefined = undefined;

  // if (usersList) {
  //   foundUser = usersList.find((user: UserProps) => {
  //     return user.name === userName;
  //   });
  // }

  return (
    <div className="flex flex-col gap-2 p-6">
      <div className="flex justify-end items-center w-full">
        <SearchBar />
        <Link href="/admin/" className="flex justify-center items-center w-24 bg-green-600 font-semibold p-2 rounded-lg text-white h-10">Novo</Link>
      </div>
      <table className="w-full mx-auto border-separate border-spacing-y-1">
        <thead className="bg-[#27272A] h-10">
          <tr>
            <th className={`${poppins600.className}`}>Nome</th>
            <th className={`${poppins600.className}`}>Ativo</th>
            <th className={`${poppins600.className}`}>Descrição</th>
            <th className={`${poppins600.className} w-[500px]`}>Permissões</th>
          </tr>
        </thead>
        <ProfileTableRow profileList={profileList} foundProfile={foundProfile} />
      </table>
    </div>
  )
}