import React from "react";
import RickMorty from "../assets/Rick&Morty.png";
import logo from "../assets/logo.png";
import { useAuth } from "../context/AuthProvider";

export function Home() {
  const auth = useAuth();
  return (
    <>
      <div className="images-wrapper">
        <img src={logo} alt="Rick and Morty" />
        <img src={RickMorty} alt="Rick and Morty" />
      </div>
      <h1>
        Добро пожаловать на фан-страницу по Рику и Морти
        {auth.user && `, ${auth.user}`}
      </h1>
    </>
  );
}
