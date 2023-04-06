import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader/Loader";
import { BackButton } from "./BackButton";

export function CharacterCard() {
  const { id } = useParams();

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
        <span>Имя:</span> {name}
      </div>
      <div className="character-card__status">
        <span>Статус:</span> {status}
      </div>
      <div className="character-card__species">
        <span>Раса:</span> {species}
      </div>
      {type && (
        <div className="character-card__type">
          <span>Вид:</span> ${type}
        </div>
      )}
      <div className="character-card__gender">
        <span>Гендер:</span> {gender}
      </div>
      <div className="character-card__created">
        <span>Создан:</span> {localedDate}
      </div>
      <BackButton />
    </div>
  );
}
