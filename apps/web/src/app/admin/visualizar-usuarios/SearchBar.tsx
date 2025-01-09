import { ChangeEvent, useContext, useEffect, useState } from "react";
import SearchIcon from "../../../../public/mag-lens.png";
import Users from "../../../../../api/dist/model/users";
import { GeneralContext } from "../../context/context";

export default function SearchBar() {

  const { getInputValues, userName } = useContext(GeneralContext);

  return (
    <div className="flex w-2/4 mx-auto my-11 justify-between bg-[#09090B] py-4 px-2 ">
      <label>Pesquisar Usuários</label>
      <div className="flex">
        <img src={SearchIcon.src} alt="Buscar Usuário" />
        <input type="text" className="text-slate-700" onChange={(e) => getInputValues(e)} />
      </div>
    </div>
  )
}