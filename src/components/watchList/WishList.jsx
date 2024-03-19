import React, { useState, useEffect } from "react";
import axios from "axios";

function WishList({}) {
  const [myWishList, setMyWishList] = useState([]);
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
      "https://api.themoviedb.org/3/account/11448289/watchlist/movies",
      options
    );
    const data = await response.data;
    setMyWishList(data.results);
  };
  useEffect(() => {
    getFaveroteMovie();
  }, []);
  console.log(myWishList);
  return (
    <div className="wishListCard">
      {myWishList?.map((movie) => {
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

export default WishList;
