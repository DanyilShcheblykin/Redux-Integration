import React, { useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";
import { IRepo } from "../models/modeles";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavorite, removeAction } = useActions();


  const { favorites } = useAppSelector((state) => state.github);
  console.log(favorites.includes(repo.html_url))

 


  const [isFev, setIsFev] = useState(favorites.includes(repo.url));

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorite(repo.url);
  };

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeAction(repo.url);
  };

  return (
    <div className="border  py-3 px-5 cursor-pointer mb-2 active:border-red-400 hover:bg-gray-400 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks : <span className="font-bold">{repo.forks}</span>
          Watchers : <span className="font-bold">{repo.watchers}</span>
        </p>

        <p className="text-sm font-thin">{repo?.description}</p>
      </a>
      {isFev ? (
        <button
          onClick={removeFromFavorite}
          className="py-2 px-4  bg-red-400 rounded hover:bg-red-500 active:bg-red-800 "
        >
          Remove
        </button>
      ) : (
        <button
          onClick={addToFavorite}
          className="mr-6 py-2 px-4  bg-yellow-400 rounded hover:bg-yellow-500 active:bg-green-300 "
        >
          Add
        </button>
      )}
    </div>
  );
};

export default RepoCard;
