import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Loader from "./Loader/Loader";
import { BackButton } from "./BackButton";

export function LocationCard() {
  const { id } = useParams();

  const { data, loading, error } = useFetch(window.Config.api.location, {
    id,
  });

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
        <span>Имя:</span> {name}
      </div>
      <div className="location-card__type">
        <span>Тип:</span> {type}
      </div>
      <div className="location-card__dimension">
        <span>Измерение:</span> {dimension}
      </div>
      <div className="location-card__created">
        <span>Создан:</span> {localedDate}
      </div>
      <BackButton />
    </div>
  );
}
