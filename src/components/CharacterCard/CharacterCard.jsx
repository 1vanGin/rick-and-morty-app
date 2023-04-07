import "./CharacterCard.css";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.js";
import Loader from "../Loader/Loader.jsx";
import { Button } from "@mantine/core";

export function CharacterCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetch(
    window.Config.api.root + window.Config.api.character,
    {
      id,
    }
  );

  if (error) {
    return <Navigate to="/characters" />;
  }

  if (loading) {
    return <Loader />;
  }

  const { name, status, species, type, gender, image, created } = data;
  const localedDate = new Date(created).toLocaleString();

  return (
    <div className="character-card">
      <img className="character-card__image" src={image} alt="name" />
      <div className="character-card__name">
        <span className="character-card__label">Имя:</span> {name}
      </div>
      <div className="character-card__status">
        <span className="character-card__label">Статус:</span> {status}
      </div>
      <div className="character-card__species">
        <span className="character-card__label">Раса:</span> {species}
      </div>
      {type && (
        <div className="character-card__type">
          <span className="character-card__label">Вид:</span> ${type}
        </div>
      )}
      <div className="character-card__gender">
        <span className="character-card__label">Гендер:</span> {gender}
      </div>
      <div className="character-card__created">
        <span className="character-card__label">Создан:</span> {localedDate}
      </div>
      <Button
        variant="outline"
        color="cyan"
        size="lg"
        mt="20px"
        onClick={() => navigate(-1)}
      >
        Назад
      </Button>
    </div>
  );
}
