import SearchIcon from "../../../../public/mag-lens.png";

export default function SearchBar() {
  return (
    <div className="flex w-2/4 mx-auto my-11 justify-between bg-[#09090B] py-4 px-2 ">
      <label>Pesquisar Usuários</label>
      <div className="flex">
        <img src={SearchIcon.src} alt="Buscar Usuário" />
        <input type="text" className="" />
      </div>
    </div>
  )
}