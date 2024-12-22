"use client";

import SearchIcon from "../../../../public/magnifying-lens.png";
import ProfileAvatar from "../../../../public/profile-avatar.png";
import { poppins400, poppins600 } from "../../../utils/loadFont";

import useToggle from "../../../hooks/useToggle";
export default function Header() {

  const [openSearchInput, setOpenSearchInput] = useToggle(false);

  console.log("OPEN", openSearchInput);

  return (
    <header className="flex w-full h-28 p-5 justify-between items-center">
      <h1 className={`${poppins600.className} text-2xl`}>Administrador</h1>
      <div className="flex w-2/4 justify-end">
        <div className="flex items-center">
          {
            openSearchInput === true
              ?
              <input type="text" className="bg-transparent border-b outline-0" />
              :
              ""
          }
          <button className="w-12" onClick={() => setOpenSearchInput()}>
            <img src={SearchIcon.src} alt="Search Icon" />
          </button>
          <div className="ml-5 mr-5 border-l border-l-white">
            <img className="ml-2.5" src={ProfileAvatar.src} alt="Profile Avatar" />
          </div>
          <div className="flex flex-col">
            <p className={`${poppins600.className} text-2xl`}>Eu usuário</p>
            <p className={poppins400.className}>usuário@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}