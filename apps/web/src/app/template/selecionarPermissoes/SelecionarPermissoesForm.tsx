"use client";

import React, { useState } from "react";
import { poppins400, poppins600 } from "../../../utils/loadFont";

type Permission = {
  id: number;
  name: string;
};

export default function Form() {
  const [availablePermissions, setAvailablePermissions] = useState<
    Permission[]
  >([
    { id: 1, name: "inclui-a" },
    { id: 2, name: "inclui-a" },
    { id: 3, name: "inclui-a" },
    { id: 4, name: "inclui-a" },
    { id: 5, name: "inclui-a" },
  ]);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

  const moveToSelected = (permission: Permission): void => {
    setAvailablePermissions((prev) =>
      prev.filter((item) => item.id !== permission.id)
    );
    setSelectedPermissions((prev) => [...prev, permission]);
  };

  const moveToAvailable = (permission: Permission): void => {
    setSelectedPermissions((prev) =>
      prev.filter((item) => item.id !== permission.id)
    );
    setAvailablePermissions((prev) => [...prev, permission]);
  };

  return (
    <form
      action="https://www.cod3r.com.br/"
      method="post"
      className="w-3/5 m-auto bg-skin-formBackground rounded-lg shadow-md pb-16"
    >
      <div className="container mx-auto p-6 flex flex-col gap-6 text-skin-innerText text-2xl">
        <div className="flex flex-col gap-4 bg-skin-tableBackground p-4 rounded-lg">
          <div className="flex flex-col p-2">
            <label
              htmlFor="id"
              className={`${poppins400.className} text-md mb-4`}
            >
              ID
            </label>
            <input
              type="text"
              id="id"
              className="w-3/5 p-2 rounded-lg bg-skin-inputBackground text-skin-base focus:outline-none focus:ring-2 focus:ring-skin-base placeholder-stone-900"
              placeholder="incluir-produto"
            />
          </div>
          <div className="flex flex-col p-2">
            <label
              htmlFor="nome"
              className={`${poppins400.className} text-xl mb-4`}
            >
              Nome
            </label>
            <input
              type="text"
              id="nome"
              className="w-full p-2 rounded-lg bg-skin-inputBackground focus:outline-none focus:ring-2 focus:ring-skin-base placeholder-stone-900"
              placeholder="cadastrar novo produto (incluir)"
            />
          </div>
          <div className="flex flex-col p-2">
            <label
              htmlFor="descricao"
              className={`${poppins400.className} text-xl mb-4`}
            >
              Descrição
            </label>
            <input
              type="text"
              id="descricao"
              className="w-full p-2 rounded-lg bg-skin-inputBackground focus:outline-none focus:ring-2 focus:ring-skin-base placeholder-stone-900"
              placeholder="Ao utilizar a interface da aplicação administrativa, o usuário pode..."
            />
          </div>
        </div>

        <div className="flex gap-6">
          <div className="w-1/2 bg-skin-tableBackground rounded-lg shadow-md pb-4">
            <p
              className={`${poppins600.className} bg-skin-buttonBackgroundGray w-full p-2 text-center mb-4 rounded-t-lg`}
            >
              Permissões Disponíveis
            </p>
            <div className="grid grid-cols-4 gap-4 p-4">
              {availablePermissions.map((permission) => (
                <button
                  key={permission.id}
                  onClick={() => moveToSelected(permission)}
                  className="bg-skin-formBackground text-sm text-center p-2 rounded-full border border-blue-400 shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105 focus:ring focus:ring-blue-400"
                >
                  {permission.name}
                </button>
              ))}
            </div>
          </div>

          <div className="w-1/2 bg-skin-tableBackground rounded-md shadow-md pb-4">
            <p
              className={`${poppins600.className} bg-skin-buttonBackgroundGray w-full text-center p-2 mb-4 rounded-t-lg`}
            >
              Permissões Selecionadas
            </p>
            <div className="grid grid-cols-4 gap-4 p-4">
              {selectedPermissions.map((permission) => (
                <button
                  key={permission.id}
                  onClick={() => moveToAvailable(permission)}
                  className="bg-skin-formBackground text-sm text-center p-2 rounded-full border border-blue-400 shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-105 focus:ring focus:ring-blue-400"
                >
                  {permission.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="block bg-skin-buttonBackgroundGreen w-1/5 min-w-32 ml-auto mr-4 font-semibold p-2 rounded-lg text-white mb-2 justify-end"
      >
        Salvar
      </button>
    </form>
  );
}
