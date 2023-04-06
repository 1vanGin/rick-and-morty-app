import React from "react";
import { Route, Routes } from "react-router-dom";
import { LazyLoad } from "../components/LazyLoad";
import { PrivateLazyLoad } from "../components/PrivateLazyLoad";

export function RedirectRouter() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<LazyLoad from="pages/Home" componentName="Home" />}
        />

        <Route
          path="/characters"
          element={
            <PrivateLazyLoad
              from="pages/Characters"
              componentName="Characters"
            />
          }
        />
        <Route
          path="/characters/:id"
          element={
            <PrivateLazyLoad
              from="components/CharacterCard"
              componentName="CharacterCard"
            />
          }
        />

        <Route
          path="/locations"
          element={
            <PrivateLazyLoad from="pages/Locations" componentName="Locations" />
          }
        />
        <Route
          path="/locations/:id"
          element={
            <PrivateLazyLoad
              from="components/LocationCard"
              componentName="LocationCard"
            />
          }
        />

        <Route
          path="/episodes"
          element={
            <PrivateLazyLoad from="pages/Episodes" componentName="Episodes" />
          }
        />
        <Route
          path="/episodes/:id"
          element={
            <PrivateLazyLoad
              from="components/EpisodeCard"
              componentName="EpisodeCard"
            />
          }
        />

        <Route
          path="/login"
          element={<LazyLoad from="pages/Login" componentName="Login" />}
        />
        <Route
          path="*"
          element={<LazyLoad from="pages/NotFound" componentName="NotFound" />}
        />
      </Routes>
    </div>
  );
}
