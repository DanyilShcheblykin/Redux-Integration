import React, { useEffect, useState } from "react";
import { useDebounce } from "../hooks/debounce";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/gitHub.api";
import RepoCard from "../components/repoCard";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const [dropdown, setDropDown] = useState(false);
  const [userArray, setUserArray] = useState(false);
  const [showCards, setShowcards] = useState(false);

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const clickHandler = (userName: string) => {
    fetchRepos(userName);
    setDropDown(false);

    setDropDown(false);
    fetchRepos(debounced).then((data) => {
      console.log(data);
      if (data.data !== undefined) {
        if (data.data.length === 0) {
          setUserArray(true);
        } else {
          setShowcards(true);
        }
      }
    });
  };
  console.log(isLoading);

  const changeInputV = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowcards(false);
    setSearch(e.target.value);
    setUserArray(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setDropDown(debounced.length > 3 && data?.length! > 0);
    }, 1000);
  }, [debounced, data]);

  return (
    <div
      onClick={() => setDropDown(false)}
      className="flex justify-center pt-10 mx-auto h-screen w-screen"
    >
      {isError && (
        <p className="text-center text-red-500">Something went wrong</p>
      )}

      <div className="relative w-[560px]">
        <input
          placeholder="Serch gitHub userName"
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          value={search}
          onChange={(e) => changeInputV(e)}
        />
        {isLoading && <p className="text-center"> Loading... </p>}
        {dropdown ? (
          <ul className="overflow-y-scroll list-none absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white">
            {data?.map((user) => (
              <li
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white cursor-pointer"
                key={user.id}
              >
                {user.login}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}

        <div className="container">
          {areReposLoading && <p className="text-center"> Repos are loading</p>}
          {userArray ? (
            <h1 className="mb-10 text-[16px] text-red-700 text-center">
              {" "}
              Unfortanatly no repos with this name
            </h1>
          ) : null}
          {showCards
            ? repos?.map((repo) => (
                <RepoCard repo={repo} key={repo.id}></RepoCard>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
