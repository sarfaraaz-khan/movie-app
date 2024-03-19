import React from "react";

function Genres({ handleChange }) {
  return (
    <div className="genres">
      <button value="Action" onClick={handleChange}>
        Action
      </button>
      <button value="Adventure" onClick={handleChange}>
        Adventure
      </button>
      <button value="Animation" onClick={handleChange}>
        Animation{" "}
      </button>
      <button value="Crime" onClick={handleChange}>
        Crime
      </button>
      <button value="Documentary" onClick={handleChange}>
        Documentary
      </button>
      <button value="Drama" onClick={handleChange}>
        Drama
      </button>
      <button value="Family" onClick={handleChange}>
        Family
      </button>
    </div>
  );
}

export default Genres;
