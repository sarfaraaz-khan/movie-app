import React from "react";

function UserScore({ handluserRating }) {
  return (
    <div>
      <span>0</span>
      <input
        id="typeinp"
        type="range"
        min="0"
        max="5"
        defaultValue="3"
        step="1"
        onChange={handluserRating}
      />
      <span>5</span>
    </div>
  );
}

export default UserScore;
