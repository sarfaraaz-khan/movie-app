import React from "react";
import { Rating } from "react-simple-star-rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";

function Card({
  data,
  fetchTrailer,
  handleRating,
  addToFavorite,
  addToWishList,
}) {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500/";
  return (
    <div key={data.id} className="card">
      <div className="cardHead">
        <img
          key={data.id}
          src={imageBaseUrl + data.backdrop_path}
          alt=""
          onClick={() => fetchTrailer(data.id)}
        />

        <div className="titleOver"></div>
        <div className="title">
          <span>
            {data.original_title} : {data.release_date}
          </span>
        </div>
      </div>

      <div className="cardBody" key={data.id}>
        <h2 key={data.id}></h2>
        <div className="ratingContainer">
          <Rating onClick={handleRating} size={25} />
        </div>
        <div className="addButtonContainer">
          <div className="faveroteBtn">
            <FavoriteIcon
              onClick={() => addToFavorite(data.id)}
              style={{ color: "orange" }}
            />
            <span>Favorite</span>
          </div>
          <div className="wishListBtn">
            <BookmarkIcon
              onClick={() => {
                addToWishList(data.id);
              }}
              style={{ color: "#ce46de" }}
            />
            <span>Wishlist</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
