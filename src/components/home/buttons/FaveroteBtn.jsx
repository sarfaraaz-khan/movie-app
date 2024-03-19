import React from "react";
import { Link } from "react-router-dom";
function FaveroteBtn() {
  return (
    <Link to="/faverote">
      <button>Faverote</button>
    </Link>
  );
}

export default FaveroteBtn;
