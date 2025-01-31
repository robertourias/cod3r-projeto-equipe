"use client";

import SearchIcon from "../../../../public/magnifying-lens.png";
import ProfileAvatar from "../../../../public/profile-avatar.png";
import { poppins400, poppins600 } from "../../../utils/loadFont";

import useToggle from "../../../hooks/useToggle";
import Link from "next/link";
import { useContext } from "react";
import { GeneralContext } from "../../context/context";
export default function Header() {

  const [openSearchInput, setOpenSearchInput] = useToggle(false);

  const { selectedUser } = useContext(GeneralContext)

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
            <p className={`${poppins600.className} text-xl`}>{selectedUser?.name}</p>
            <p className={`${poppins400.className} text-sm`}>{selectedUser?.email}</p>
            <Link href="/" className="text-sm font-Poppins text-slate-500 hover:text-slate-400">
              Sair
            </Link>
          </div>

        </div>
      </div>
    </header>
  )
}