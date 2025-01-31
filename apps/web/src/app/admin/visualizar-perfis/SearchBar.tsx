import { useContext } from "react";
import SearchIcon from "../../../../public/mag-lens.png";
import { GeneralContext } from "../../context/context";

export default function SearchBar() {

  const { getInputValues, userName } = useContext(GeneralContext);

  return (
    // bg-[#09090B]
    <div className="flex items-center justify-center p-2 ">
      <label>Pesquisar Usuários</label>
      <div className="flex gap-4 items-center justify-center">
        <img src={SearchIcon.src} alt="Buscar Usuário" />
        <input type="text" className="text-slate-700 rounded-md h-8" onChange={(e) => getInputValues(e)} />
      </div>
    </div>
  )
}