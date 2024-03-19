import axios from "axios";
import React, { useEffect, useState } from "react";

function Favorite({}) {
  const [faveroteMovies, setFaveroteMovies] = useState([]);
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";
  const getFaveroteMovie = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGI5NjJjMDM5YjY4NmE5MGQyOTNiNWRjMzgxMTkzOSIsInN1YiI6IjYxOTZhMzE3NWMwNzFiMDA0Mjc3NDY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YQasuwQaKxjTjoTbx5UM1AELGOs9ZAr_tYr5Njp3ezg",
      },
    };
    const response = await axios.get(
      "https://api.themoviedb.org/3/account/11448289/favorite/movies?language=en-US&page=1&sort_by=created_at.asc",
      options
    );
    const data = await response.data;
    setFaveroteMovies(data.results);
  };
  useEffect(() => {
    getFaveroteMovie();
  }, []);
  console.log(faveroteMovies);
  return (
    <div className="faveroteCardContainer">
      {faveroteMovies?.map((movie) => {
        return (
          <>
            <div key={movie.id} className="card">
              <div className="cardHead">
                <img
                  key={movie.id}
                  src={imageBaseUrl + movie.backdrop_path}
                  alt=""
                />
                <div className="titleOver"></div>
                <div className="title">
                  {" "}
                  <span>
                    {movie.original_title} : {movie.release_date}
                  </span>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}

export default Favorite;
