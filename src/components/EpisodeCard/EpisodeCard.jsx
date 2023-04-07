import "./EpisodeCard.css";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.js";
import Loader from "../Loader/Loader.jsx";
import { Button } from "@mantine/core";

export function EpisodeCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    window.Config.api.root + window.Config.api.episode,
    {
      id,
    }
  );

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
        <span className="episode-card__label">Имя:</span> {name}
      </div>
      <div className="episode-card__type">
        <span className="episode-card__label">Дата выхода:</span> {air_date}
      </div>
      <div className="episode-card__dimension">
        <span className="episode-card__label">Эпизод:</span> {episode}
      </div>
      <div className="episode-card__created">
        <span className="episode-card__label">Создан:</span> {localedDate}
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
