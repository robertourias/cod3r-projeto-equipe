"use client";

import LogoSecurity from "../../../../public/logo-security.png";
import GoogleLogo from "../../../../public/icons8-google-50.png";
import EmailLogo from "../../../../public/icons8-email-50.png";
import SenhaLogo from "../../../../public/icons8-eye-50.png";
import SenhaLogoHide from "../../../../public/icons8-hide-50.png";
import { poppins400, poppins600 } from "../../../utils/loadFont";
import Link from "next/link";

export default function Form() {
  function togglePassword() {
    let passwordImage = document.getElementById(
      "password-image"
    ) as HTMLImageElement;
    let passwordToggle = document.getElementById(
      "senhaInput"
    ) as HTMLInputElement;
    if (passwordToggle && passwordToggle.type === "password") {
      passwordToggle.type = "text";
      passwordImage.src = SenhaLogoHide.src;
    } else {
      passwordToggle.type = "password";
      passwordImage.src = SenhaLogo.src;
    }
  }

  return (
    <div className="text-skin-innerText bg-skin-formBackground m-auto h-auto flex flex-col min-w-96 w-1/4 items-center rounded-lg font-Poppins p-6">
      <img
        src={LogoSecurity.src}
        alt="Logo Security"
        width="162"
        height="129"
        className="mx-auto mt-4"
      />
      <p className={`${poppins600.className} text-2xl mb-4`}>
        Entre com sua conta
      </p>
      <form
        method="post"
        action="https://www.cod3r.com.br/"
        className={`${poppins400.className} w-full items-center flex flex-col`}
      >
        <div className="mb-6 w-3/4">
          <div className="relative">
            <img
              src={EmailLogo.src}
              alt="E-mail Logo"
              className="w-5 h-5 absolute right-5 top-10"
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
            className="bg-skin-inputBackground rounded-lg w-full p-2 mb-6 focus:outline-none focus:ring-2 focus:ring-skin-base"
          />
          <div className="relative">
            <img
              id="password-image"
              src={SenhaLogo.src}
              alt="Senha Logo"
              className="w-5 h-5 absolute right-5 top-9"
              onClick={togglePassword}
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
              className="bg-skin-inputBackground rounded-lg w-full p-2 mb-1 focus:outline-none focus:ring-2 focus:ring-skin-base"
            />
          </div>
          <Link
            href="./troca-senha"
            className="block text-end text-gray-500 -mr-5"
          >
            Esqueceu a senha?
          </Link>
        </div>
        <button
          type="submit"
          className="block bg-skin-buttonBackgroundGreen w-3/4 font-semibold p-2 rounded-lg text-white mb-2"
        >
          Login
        </button>
        <div className="flex items-center w-3/4">
          <hr className="w-full my-4 border-skin-base border-1" />
          <p className="inline p-1 text-skin-innerText">ou</p>
          <hr className="w-full my-4 border-skin-base border-1" />
        </div>
      </form>
      <div className="m-4 w-fit h-fit">
        <Link
          href="https://www.cod3r.com.br"
          className="rounded-full block bg-skin-buttonBackgroundRed p-5"
        >
          <img src={GoogleLogo.src} alt="Google Logo" className="w-5 h-5" />
        </Link>
      </div>
      <p className="text-skin-innerText">
        Ainda não possui conta?&nbsp;
        <Link className="text-skin-linkText" href="./cadastro">
          Cadastre-se aqui
        </Link>
      </p>
      <p className="text-gray-500 text-sm">
        ou faça login pelo Google clicando no G acima.
      </p>
    </div>
  );
}
