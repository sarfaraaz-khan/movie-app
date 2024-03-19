import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./header.css";
function Header() {
  const isOnline = () => {
    if (navigator.onLine) {
      toast("your online now");
    } else {
      toast("your offline now");
      toast("Loading your data offline");
    }
  };

  window.addEventListener("online", isOnline);
  window.addEventListener("offline", isOnline);
  isOnline();

  return (
    <nav>
      <div className="rightSideContainer">
        <h1>Movie App</h1>
      </div>
      <div>
        <ToastContainer />
      </div>
      <div className="leftSideContainer"></div>
    </nav>
  );
}

export default Header;
