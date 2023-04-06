import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Loader from "../components/Loader/Loader";

export function Characters() {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, loading, error, hasMore } = useFetch(
    window.Config.api.character,
    {
      pageNumber,
    }
  );

  const observer = useRef();
  const lastNodeRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        //виден ли элемент на экране
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevState) => prevState + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <>
      <h1>Персонажи</h1>
      <div className="characters-wrapper">
        {data.map((character, index) => {
          if (data.length - 10 === index + 1) {
            return (
              <Link
                ref={lastNodeRef}
                to={`/characters/${character.id}`}
                className="character-card"
                key={character.id}
              >
                <img src={character.image} alt="name" />
                <div>{character.name}</div>
              </Link>
            );
          } else {
            return (
              <Link
                to={`/characters/${character.id}`}
                className="character-card"
                key={character.id}
              >
                <img src={character.image} alt="name" />
                <div>{character.name}</div>
              </Link>
            );
          }
        })}
      </div>
      {!loading && data.length === 0 && !error && <div>Нет данных</div>}
      {error && <div>Произошла ошибка загрузки данных</div>}
      {loading && <Loader />}
    </>
  );
}
