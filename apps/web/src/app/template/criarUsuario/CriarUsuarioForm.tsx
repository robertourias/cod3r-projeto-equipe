"use client";

import { poppins400, poppins600 } from "../../../utils/loadFont";

export default function Form() {
  return (
    <div className="text-skin-innerText bg-skin-formBackground m-auto h-auto flex flex-col w-1/2 min-w-96 items-center rounded-lg font-Poppins p-0 pb-6">
      <form
        method="post"
        action="https://www.cod3r.com.br/"
        className={`${poppins400.className} w-full items-center flex flex-col pb-4`}
      >
        <p
          className={`${poppins600.className} rounded-t-lg text-2xl pt-4 pb-4 w-full m-auto flex flex-col items-center mb-4 bg-skin-buttonBackgroundGray`}
        >
          Criar Usuário
        </p>
        <div className="mb-6 w-3/4 pt-4">
          <div className="relative">
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
            className="bg-skin-inputBackground rounded-lg w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-skin-base"
          />
        </div>
        <div className="flex m-auto w-3/4 pb-10 justify-between text-center">
          <select
            name="profile"
            id="profile"
            className="w-1/3 m-auto mr-2 bg-skin-selectInputBackground p-10 pt-2 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-base"
          >
            <option value="0" selected>
              Perfil
            </option>
            <option value="1">Perfil 1</option>
            <option value="2">Perfil 2</option>
            <option value="3">Perfil 3</option>
          </select>
          <select
            name="daysWeek"
            id="daysWeek"
            className="w-1/3 m-auto ml-2 mr-2 bg-skin-selectInputBackground p-10 pt-2 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-base"
          >
            <option value="0" selected>
              Dias de trabalho
            </option>
            <option value="1">Opção 1</option>
            <option value="2">Opção 2</option>
            <option value="3">Opção 3</option>
          </select>
          <select
            name="Active"
            id="active"
            className="w-1/3 m-auto ml-2 bg-skin-selectInputBackground p-10 pt-2 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-base"
          >
            <option value="0" selected>
              Ativo
            </option>
            <option value="1">Sim</option>
            <option value="2">Não</option>
          </select>
        </div>
        <div className="flex w-3/4">
          <button
            type="submit"
            className="block bg-skin-buttonBackgroundGreen w-1/5 min-w-32 ml-auto mr-4 font-semibold p-2 rounded-lg text-white mb-2"
          >
            Salvar
          </button>
          <button
            type="submit"
            className="block bg-skin-buttonBackgroundBlue w-1/5 min-w-32 mr-auto ml-4 font-semibold p-2 rounded-lg text-white mb-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
