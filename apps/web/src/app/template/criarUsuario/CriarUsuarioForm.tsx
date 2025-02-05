"use client";

import { ChangeEvent, useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { poppins400, poppins600 } from "../../../utils/loadFont";
import { GeneralContext } from "../../context/context";
import { ProfileProps } from "@repo/core";

export default function Form() {

  const router = useRouter();
  const { formData, setFormData, token } = useContext(GeneralContext);

  const [profileList, setProfileList] = useState<ProfileProps[]>([])
  const [selectedProfile, setSelectedProfile] = useState<ProfileProps>({})

  // console.log("PREVIOUS FORM DATA", formData);

  useEffect(() => {
    fetch('http://localhost:3333/profile', {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // console.log("ProfileTableContainer data", data.data);
        setProfileList(data.data);
      });
  }, [])

  function handleSubmitNewUser(e: any) {
    e.preventDefault();
    const { name, email, confirmPassword, phoneNumber } = formData;

    fetch("http://localhost:3333/users/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": confirmPassword,
        "phone": phoneNumber,
        "profileUrl": "",
        "recoveryToken": "no-token",
        "tokenExpiration": null,
        "twoFactorAuth": false,
        "workingHours": "",
        "Profiles": [selectedProfile]
      })
    })
      .then(response => response.json())
      .then(data => {
        // console.log("DATA status", data)
        if (data.status == "400") {
          // console.log("errors: ", JSON.stringify(data.errors, null, 2))
          alert(data.message + "\n" + data.errors)
        }
        if (data.status == 201) {
          router.push("/admin/visualizar-usuarios")
        }
      })
  }

  return (
    <div className="text-skin-innerText bg-skin-formBackground m-auto h-auto flex flex-col w-1/2 min-w-96 items-center rounded-lg font-Poppins p-0 pb-6">
      <form
        className={`${poppins400.className} w-full items-center flex flex-col pb-4`}
      >
        <p
          className={`${poppins600.className} rounded-t-lg text-2xl pt-4 pb-4 w-full m-auto flex flex-col items-center mb-4 bg-skin-buttonBackgroundGray`}
        >
          Criar Usuário
        </p>
        <div className="mb-6 w-3/4 pt-2">
          <div className="relative">
            <label
              htmlFor="nameInput"
              className="block mb-2 text-sm font-medium text-white"
            >
              Nome
            </label>
          </div>
          <input
            type="text"
            id="nameInput"
            className="bg-skin-inputBackground rounded-lg w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
            // placeholder={formData.name}
            onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
          // className="bg-skin-inputBackground rounded-lg w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-skin-base"
          />
        </div>

        <div className="mb-6 w-3/4 pt-2">
          <div className="relative">
            <label
              htmlFor="emailInput"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
          </div>
          <input
            type="email"
            id="emailInput"
            className="bg-skin-inputBackground rounded-lg w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
            // placeholder={formData.name}
            onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }}
          // className="bg-skin-inputBackground rounded-lg w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-skin-base"
          />
        </div>

        <div className="mb-6 w-3/4 ">
          <div className="relative">
            <label
              htmlFor="passwordInput"
              className="block mb-2 text-sm font-medium text-white"
            >
              Senha
            </label>
          </div>
          <input
            type="password"
            id="passwordInput"
            className="bg-skin-inputBackground rounded-lg w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
            // placeholder={formData.confirmPassword}
            onChange={(e) => { setFormData({ ...formData, confirmPassword: e.target.value }) }}
          // className="bg-skin-inputBackground rounded-lg w-full p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-skin-base"
          />
        </div>


        <div className="flex m-auto w-3/4 py-4 pb-10 justify-between text-center">
          <select
            name="profile"
            id="profile"
            className="w-1/3 p-2 pt-2 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
            onChange={(e) => { setSelectedProfile({ id: e.target.value }) }}
          >
            <option value="0" selected>- Perfil -</option>
            {
              profileList.length > 0 && profileList.map((profile) => {
                return <option value={profile.id}>{profile.name}</option>
              })
            }
          </select>

          {/* <select
            name="daysWeek"
            id="daysWeek"
            className="w-1/3 m-auto ml-2 mr-2 bg-skin-selectInputBackground p-10 pt-2 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
          >
            <option value="0" selected>
              Dias de trabalho
            </option>
            <option value="1">Segunda à sexta das 8:00-12:00 e 13:30-17:30</option>
            <option value="2">Segunda à sexta das 9:00-13:00 e 14:30-18:00</option>
            <option value="3">Segunda à sexta das 10:00-14:00 e 15:30-19:00</option>
          </select>

          <select
            name="Active"
            id="active"
            className="w-1/3 m-auto ml-2 bg-skin-selectInputBackground p-10 pt-2 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
          >
            <option value="0" selected>
              Ativo
            </option>
            <option value="1">Sim</option>
            <option value="2">Não</option>
          </select> */}
        </div>
        <div className="flex w-3/4">
          <button
            type="button"
            className="block bg-green-600 bg-skin-buttonBackgroundGreen w-1/5 min-w-32 ml-auto mr-4 font-semibold p-2 rounded-lg text-white mb-2"
            onClick={(e) => handleSubmitNewUser(e)}
          >
            Salvar
          </button>
          <button
            type="submit"
            className="block bg-red-600 bg-skin-buttonBackgroundBlue w-1/5 min-w-32 mr-auto ml-4 font-semibold p-2 rounded-lg text-white mb-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
