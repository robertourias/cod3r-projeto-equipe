import EmailLogo from "../../../../public/icons8-email-50.png";
import NameLogo from "../../../../public/icons8-writing-50.png";
import SenhaLogo from "../../../../public/icons8-lock-50.png";
import { poppins400, poppins600 } from "../../../utils/loadFont";
import Link from "next/link";

export default function Form() {
  return (
    <div className="text-skin-innerText bg-skin-formBackground m-auto h-auto flex flex-col min-w-96 w-1/4 items-center rounded-lg font-Poppins p-6">
      <p className={`${poppins600.className} text-2xl mb-4`}>Cadastrar</p>
      <form
        method="post"
        action="https://www.cod3r.com.br/"
        className={`${poppins400.className} w-full items-center flex flex-col`}
      >
        <div className="mb-6 w-3/4">
          <div className="relative">
            <img
              src={NameLogo.src}
              alt="Name Logo"
              className="w-5 h-5 absolute left-3 top-10"
            />
            <label
              htmlFor="nameInput"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-skin-innerText"
            >
              Nome
            </label>
          </div>
          <input
            type="text"
            id="nameInput"
            className="bg-skin-inputBackground rounded-lg w-full p-2 pl-12 mb-6 focus:outline-none focus:ring-2 focus:ring-skin-base"
          />
          <div className="relative">
            <img
              src={EmailLogo.src}
              alt="E-mail Logo"
              className="w-5 h-5 absolute left-3 top-10"
            />
            <label
              htmlFor="emailInput"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-skin-innerText"
            >
              E-mail
            </label>
          </div>
          <input
            type="email"
            id="emailInput"
            className="bg-skin-inputBackground rounded-lg w-full p-2 pl-12 mb-6 focus:outline-none focus:ring-2 focus:ring-skin-base"
          />
          <div className="relative mb-6">
            <img
              src={SenhaLogo.src}
              alt="Senha Logo"
              className="w-5 h-5 absolute left-3 top-9"
            />
            <label
              htmlFor="senhaInput"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-skin-innerText"
            >
              Senha
            </label>
            <input
              type="password"
              id="senhaInput"
              className="bg-skin-inputBackground rounded-lg w-full p-2 pl-12 mb-1 focus:outline-none focus:ring-2 focus:ring-skin-base"
            />
          </div>
          <div className="relative mb-6">
            <img
              src={SenhaLogo.src}
              alt="Senha Logo"
              className="w-5 h-5 absolute left-3 top-9"
            />
            <label
              htmlFor="repeteSenhaInput"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-skin-innerText"
            >
              Repita a senha
            </label>
            <input
              type="password"
              id="repeteSenhaInput"
              className="bg-skin-inputBackground rounded-lg w-full p-2 pl-12 mb-1 focus:outline-none focus:ring-2 focus:ring-skin-base"
            />
          </div>
        </div>
        <button
          type="submit"
          className="block bg-skin-buttonBackgroundGreen w-3/4 font-semibold p-2 rounded-lg text-white mb-2"
        >
          Cadastrar-se
        </button>
        <div className="p-4">
          <p>
            Já possui conta?&nbsp;
            <Link
              href="https://www.cod3r.com.br/"
              className="text-end text-skin-linkText"
            >
              Faça login.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
