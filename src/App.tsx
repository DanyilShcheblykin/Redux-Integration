import React from "react";
import { Routes, Route } from "react-router-dom";
import FavoritesPage from "./pages/FavoritesPage";
import Homepage from "./pages/Homepage";
import Navidation from "./components/Navidation";

function App() {
  return (
    <>
      <Navidation></Navidation>
      <Routes>
        <Route path="/" element={<Homepage></Homepage>}></Route>
        <Route
          path="/favorites"
          element={<FavoritesPage></FavoritesPage>}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
