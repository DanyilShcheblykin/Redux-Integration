import React from "react";
import { useAppSelector } from "../hooks/redux";

const FavoritesPage = () => {
  const { favorites } = useAppSelector((state) => state.github);


  if (favorites.length === 0) {
    return <p className="text-center text-[26px] text-red-700 mb-28">No items</p>;
  } else
    return (
      <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
        <ul className="list-none">
          {favorites.map((item) => {
            return (
              <li>
                <a href={item}>{item}</a>
              </li>
            );
          })}
        </ul>
      </div>
    );
};

export default FavoritesPage;
