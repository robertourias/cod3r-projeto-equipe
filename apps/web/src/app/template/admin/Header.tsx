import SearchIcon from "../../../../public/magnifying-lens.png";
import ProfileAvatar from "../../../../public/profile-avatar.png";
export default function Header() {
  //py-14 px-9
  return (
    <header className="flex w-4/5 h-14 justify-between items-center">
      <h1 className="font-Poppins font-semibold text-2xl">Administrador</h1>
      <div className="flex w-1/4">
        <div className="flex items-center">
          <div className="w-6 h-6">
            <img src={SearchIcon.src} alt="Search Icon" />
          </div>
          <div className="ml-5 pl-5 pr-5 border-l border-l-white">
            <img src={ProfileAvatar.src} alt="Profile Avatar" />
          </div>
          <div className="flex flex-col">
            <p className="">Eu usuário</p>
            <p className="">usuário@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  )
}