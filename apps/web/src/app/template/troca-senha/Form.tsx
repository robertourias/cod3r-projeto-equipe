import EmailLogo from "../../../../public/icons8-email-50.png";
import { poppins400, poppins600 } from "../../../utils/loadFont";

export default function Form() {
  return (
    <div className="text-skin-innerText bg-skin-formBackground m-auto h-auto flex flex-col min-w-96 w-1/4 items-center rounded-lg font-Poppins p-6">
      <p className={`${poppins600.className} text-2xl mb-6 mt-6`}>
        Solicitar troca de senha
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
        </div>
        <button
          type="submit"
          className="block bg-skin-buttonBackgroundGreen w-3/4 font-semibold p-2 rounded-lg text-white mb-2"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
