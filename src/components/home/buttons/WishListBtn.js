import React from "react";
import { Link } from "react-router-dom";

function WishListBtn() {
  return (
    <Link to="/wishlist">
      <button> Wishlist</button>
    </Link>
  );
}

export default WishListBtn;
