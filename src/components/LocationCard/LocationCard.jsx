import "./LocationCard.css";
import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.js";
import Loader from "../Loader/Loader.jsx";
import { Button } from "@mantine/core";

export function LocationCard() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(
    window.Config.api.root + window.Config.api.location,
    {
      id,
    }
  );

  if (error) {
    return <Navigate to="/locations" />;
  }

  if (loading) {
    return <Loader />;
  }

  const { name, type, dimension, created } = data;
  const localedDate = new Date(created).toLocaleString();

  return (
    <div className="location-card">
      <div className="location-card__name">
        <span className="location-card__label">Имя:</span> {name}
      </div>
      <div className="location-card__type">
        <span className="location-card__label">Тип:</span> {type}
      </div>
      <div className="location-card__dimension">
        <span className="location-card__label">Измерение:</span> {dimension}
      </div>
      <div className="location-card__created">
        <span className="location-card__label">Создан:</span> {localedDate}
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
