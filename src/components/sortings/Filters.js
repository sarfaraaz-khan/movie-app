import React from "react";
import Genres from "./Genres";
import UserScore from "./UserScore";
import Language from "./Language";
function Filters({
  handleChange,
  changeLanguage,
  handluserRating,
  getDataByRating,
}) {
  return (
    <div>
      <h1>Sort & Filter</h1>
      <h3>Genres</h3>
      <Genres handleChange={handleChange} />
      <h3>Language</h3>
      <Language changeLanguage={changeLanguage} />
      <h3>User Score</h3>
      <UserScore
        handluserRating={handluserRating}
        getDataByRating={getDataByRating}
      />
    </div>
  );
}

export default Filters;
