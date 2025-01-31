import LogoSecurity from "../../../../public/logo-security.png";
import Link from 'next/link';
import UserIcon from "../../../../public/user-icon.png";
import VisualizeIcon from "../../../../public/visualize-icon.png";
// import ReportIcon from "../../../../public/report-icon.png";

export default function SideMenu() {
  return (
    <div className="h-full w-1/5 min-w-60 flex flex-col pt-4">

      <Link href="/admin">
        <img src={LogoSecurity.src} alt="Logo Security" width="162" height="129" className="my-4 mx-auto" />
      </Link>

      <Link href="/admin/visualizar-usuarios" className="flex gap-x-2.5 p-1.5 mx-auto my-1 font-Poppins font-semibold text-slate-500">
        <img src={UserIcon.src} alt="user icon" />
        Usuários
      </Link>
      <Link href="/admin/visualizar-perfis" className="flex gap-x-2.5 p-1.5 mx-auto my-1 font-Poppins font-semibold text-slate-500">
        <img src={VisualizeIcon.src} alt="visualize icon" />
        Perfis
      </Link>
      {/* <Link href="#" className="flex gap-x-2.5 p-1.5 mx-auto my-1 font-Poppins font-semibold text-slate-500">
        <img src={ReportIcon.src} alt="report icon" />
        Relatório
      </Link> */}

      {/* TODO: Mover para local adequado depois */}
      {/* <hr className="w-2/3 self-center py-1 mt-3" />
      <Link href="/" className="flex gap-x-2.5 p-1.5 mx-auto my-1 font-Poppins font-semibold text-slate-500">
        Sair
      </Link> */}

      {/* <select className="bg-slate-800 text-slate-500 leading-9 w-4/5 h-10 rounded-lg mb-3.5 mx-auto font-Poppins font-semibold ">
        <option>Perfil de Acesso 1</option>
        <option>Perfil de Acesso 2</option>
        <option>Perfil de Acesso 3</option>
        <option>Perfil de Acesso 4</option>
      </select> */}
    </div>
  )
}