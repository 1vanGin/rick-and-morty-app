import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader/Loader";
import { BackButton } from "./BackButton";

export function EpisodeCard() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(window.Config.api.episode, {
    id,
  });

  if (error) {
    return <Navigate to="/episodes" />;
  }

  if (loading) {
    return <Loader />;
  }

  const { name, air_date, episode, created } = data;
  const localedDate = new Date(created).toLocaleString();
  return (
    <div className="episode-card">
      <div className="episode-card__name">
        <span>Имя:</span> {name}
      </div>
      <div className="episode-card__type">
        <span>Дата выхода:</span> {air_date}
      </div>
      <div className="episode-card__dimension">
        <span>Эпизод:</span> {episode}
      </div>
      <div className="episode-card__created">
        <span>Создан:</span> {localedDate}
      </div>
      <BackButton />
    </div>
  );
}
