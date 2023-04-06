import React from "react";
import login from "../assets/login.png";
import { useAuth } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    auth.signIn(username, () => {
      navigate(from, {
        replace: true,
      });
    });
  };

  return (
    <div className="login-page">
      <img src={login} alt="Rick and Morty" />
      <h1>Пожалуйста, авторизуйтесь!</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Введите логин" />
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};
