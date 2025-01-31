"use client";

import EmailLogo from "../../../../public/icons8-email-50.png";
import NameLogo from "../../../../public/icons8-writing-50.png";
import SenhaLogo from "../../../../public/icons8-lock-50.png";
import { poppins400, poppins600 } from "../../../utils/loadFont";
import { ChangeEvent, useEffect, useState, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { GeneralContext } from "../../context/context";

export default function Form() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(false);
  const { setFormData } = useContext(GeneralContext);

  function getInputName(e: ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  function getInputEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function getInputPassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function getInputConfirmPassword(e: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  useEffect(() => {
    if (password.length > 0 && confirmPassword.length > 0 && password === confirmPassword) {
      setPasswordStatus(true);
    } else {
      setPasswordStatus(false);
    }
  }, [confirmPassword]);


  function handleClick(e: any) {
    e.preventDefault();

    const formData = {
      name: name,
      email: email,
      confirmPassword: confirmPassword,
      phoneNumber: phoneNumber
    }

    setFormData(formData);
    router.push("/criarUsuario")
  }

  return (
    <div className="text-skin-innerText bg-skin-formBackground m-auto h-auto flex flex-col min-w-96 w-1/4 items-center rounded-lg font-Poppins p-6">
      <p className={`${poppins600.className} text-2xl mb-4`}>Cadastrar</p>
      <form
        method="post"
        // action="https://www.cod3r.com.br/"
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
              className="block mb-2 text-sm font-medium text-white dark:text-skin-innerText"
            >
              Nome
            </label>
          </div>
          <input
            type="text"
            id="nameInput"
            className="bg-skin-inputBackground rounded-lg w-full p-2 pl-12 mb-6 focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
            onChange={(e) => getInputName(e)}
          />
          <div className="relative">
            <img
              src={EmailLogo.src}
              alt="E-mail Logo"
              className="w-5 h-5 absolute left-3 top-10"
            />
            <label
              htmlFor="emailInput"
              className="block mb-2 text-sm font-medium text-white  dark:text-skin-innerText"
            >
              E-mail
            </label>
          </div>
          <input
            type="email"
            id="emailInput"
            className="bg-skin-inputBackground rounded-lg w-full p-2 pl-12 mb-6 focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
            onChange={(e) => getInputEmail(e)}
          />
          <div className="relative mb-6">
            <img
              src={SenhaLogo.src}
              alt="Senha Logo"
              className="w-5 h-5 absolute left-3 top-9"
            />
            <label
              htmlFor="senhaInput"
              className="block mb-2 text-sm font-medium text-white dark:text-skin-innerText"
            >
              Senha
            </label>
            <input
              type="password"
              id="senhaInput"
              className="bg-skin-inputBackground rounded-lg w-full p-2 pl-12 mb-1 focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
              onChange={(e) => getInputPassword(e)}
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
              className="block mb-2 text-sm font-medium text-white dark:text-skin-innerText"
            >
              Repita a senha
            </label>
            <input
              type="password"
              id="repeteSenhaInput"
              className="bg-skin-inputBackground rounded-lg w-full p-2 pl-12 mb-1 focus:outline-none focus:ring-2 focus:ring-skin-base text-slate-600"
              onChange={(e) => getInputConfirmPassword(e)}
            />
          </div>
          <div className="relative mb-6">
            <label
              htmlFor="telefoneInput"
              className="block mb-2 text-sm font-medium text-white dark:text-skin-innerText"
            >
              Fone
            </label>
            <div className="bg-skin-inputBackground rounded-lg focus:outline-none focus:ring-2 focus:ring-skin-base">
              <PhoneInput
                country={"br"}
                value={phoneNumber}
                inputProps={{
                  className:
                    "bg-skin-inputBackground rounded-lg w-full h-fit p-2 pl-12 focus:outline-none focus:ring-2 focus:ring-skin-base",
                }}
                dropdownStyle={{
                  backgroundColor: "#09090b",
                  color: "#fff",
                }}
                buttonStyle={{
                  backgroundColor: "#09090b",
                  color: "#fff",
                  border: "0",
                  outline: "0",
                  padding: "0",
                  height: "90%",
                  margin: "1px",
                  alignSelf: "center",
                }}
                inputStyle={{
                  backgroundColor: "#09090b",
                  color: "#fff",
                }}
                searchStyle={{
                  backgroundColor: "#09090b",
                  color: "#000",
                }}
                onChange={(value) => {
                  setPhoneNumber(value)
                  console.log(phoneNumber);
                }
                }
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          className={`block w-3/4 font-semibold p-2 rounded-lg text-white mb-2 ${passwordStatus === true ? 'bg-green-600' : 'bg-red-600'}`}
          onClick={(e) => handleClick(e)}
        >
          Cadastrar-se
        </button>
        <div className="p-4">
          <p>
            Já possui conta?&nbsp;
            <Link href="./login" className="text-end text-skin-linkText">
              Faça login.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
