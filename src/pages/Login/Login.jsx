import "./Login.css";
import React from "react";
import login from "../../assets/login.png";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const form = useForm({
    initialValues: {
      username: "",
    },
    validate: {
      username: (value) =>
        value.length < 3 ? "Имя должно содержать хотя 3 бы символа" : null,
    },
  });

  const handleSubmit = (values, event) => {
    event.preventDefault();
    auth.signIn(values.username, () => {
      navigate(from, {
        replace: true,
      });
    });
  };

  return (
    <div className="login-page">
      <img src={login} alt="Rick and Morty" />
      <h1>Пожалуйста, авторизуйтесь!</h1>
      <form
        onSubmit={form.onSubmit((values, event) => handleSubmit(values, event))}
      >
        <TextInput
          name="username"
          color="cyan"
          placeholder="Введите логин"
          size="lg"
          miw="320px"
          {...form.getInputProps("username")}
        />
        <Button type="submit" variant="outline" color="cyan" size="lg">
          Войти
        </Button>
      </form>
    </div>
  );
};
