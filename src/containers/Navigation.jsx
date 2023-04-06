import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function Navigation() {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSignOut = () => {
    auth.signOut(() => {
      navigate("/login");
    });
  };

  return (
    <div className="navigation">
      <ul>
        <li>
          <NavLink to="/">Главная</NavLink>
        </li>
        <li>
          <NavLink to="/characters">Персонажи</NavLink>
        </li>
        <li>
          <NavLink to="/locations">Локации</NavLink>
        </li>
        <li>
          <NavLink to="/episodes">Эпизоды</NavLink>
        </li>
        {auth.user && (
          <li>
            <button onClick={handleSignOut}>Выйти</button>
          </li>
        )}
      </ul>
    </div>
  );
}
