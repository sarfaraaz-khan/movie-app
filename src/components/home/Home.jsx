import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl, apiKEY } from "../apis";
import MenuIcon from "@mui/icons-material/Menu";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import VideoPlayer from "./videPlayer/VideoPlayer";
import "react-datepicker/dist/react-datepicker.css";
import Card from "./card/Card";
import "./home.css";
import FaveroteBtn from "./buttons/FaveroteBtn";
import WishListBtn from "./buttons/WishListBtn";

import Filters from "../sortings/Filters";

function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [genres, setGenres] = useState("");
  const [language, setLanuage] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [play, setPlay] = useState(false);
  const [userElectRating, setUserElectRating] = useState("");

  const URL = baseUrl + "/discover/movie?sort_by=popularity.desc&" + apiKEY;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  useEffect(() => {
    getDataBasedOnLanguage();
  }, [language]);

  useEffect(() => {
    getGenresData();
  }, [genres]);

  //Handlers
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loading
    ) {
      return;
    }
    getData();
  };

  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleChange = (event) => {
    const buttonValue = event.target.value;
    console.log("Button value:", buttonValue);

    switch (buttonValue) {
      case "Action":
        setGenres(28);
        break;
      case "Adventure":
        setGenres(12);
        break;
      case "Animation":
        setGenres(16);
        break;
      case "Comedy":
        setGenres(35);
        break;
      case "Crime":
        setGenres(80);
        break;
      case "Documentary":
        setGenres(99);
        break;
      case "Drama":
        setGenres(18);
        break;
      case "Family":
        setGenres(10751);
        break;
      default:
    }

    // Now you can use the buttonValue as needed
  };

  const addToFavorite = async (mediaId) => {
    const response = await axios.post(
      `${baseUrl}/account/11448289/favorite`,
      {
        media_type: "movie",
        media_id: mediaId,
        favorite: true,
      },
      {
        params: {
          api_key: `${apiKEY}`,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGI5NjJjMDM5YjY4NmE5MGQyOTNiNWRjMzgxMTkzOSIsInN1YiI6IjYxOTZhMzE3NWMwNzFiMDA0Mjc3NDY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YQasuwQaKxjTjoTbx5UM1AELGOs9ZAr_tYr5Njp3ezg",
        },
      }
    );
  };
  const addToWishList = async (mediaId) => {
    console.log(mediaId, "id");
    const response = await axios.post(
      `${baseUrl}/account/11448289/watchlist?${apiKEY}`,
      {
        media_type: "movie",
        media_id: mediaId,
        watchlist: true,
      },
      {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZGI5NjJjMDM5YjY4NmE5MGQyOTNiNWRjMzgxMTkzOSIsInN1YiI6IjYxOTZhMzE3NWMwNzFiMDA0Mjc3NDY4NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YQasuwQaKxjTjoTbx5UM1AELGOs9ZAr_tYr5Njp3ezg",
        },
      }
    );
  };

  // api fetching functions & Filters

  const getData = async () => {
    setLoading(true);

    if (navigator.onLine) {
      try {
        const response = await axios.get(`${URL}&page=${page}`);
        const newData = response.data.results;

        setData((prevData) => [...prevData, ...newData]);

        setPage((prevPage) => prevPage + 1);

        localStorage.setItem(`movieDataPage${page}`, JSON.stringify(newData));
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    } else {
      console.log(
        "Device is offline. Loading movie data from local storage..."
      );

      const storedData = localStorage.getItem(`movieDataPage${page}`);
      if (storedData) {
        const newData = JSON.parse(storedData);
        setData((prevData) => [...prevData, ...newData]);
      } else {
        console.log("No movie data available in local storage for page", page);
      }
    }

    setLoading(false);
  };

  const fetchTrailer = async (movieId) => {
    try {
      let trailerKey = null;
      let playState = false;

      if (navigator.onLine) {
        const response = await axios.get(
          `${baseUrl}/movie/${movieId}/videos?${apiKEY}`
        );
        const trailers = response.data.results;

        localStorage.setItem(`trailers_${movieId}`, JSON.stringify(trailers));

        if (trailers.length > 1 && trailers[1].key) {
          trailerKey = trailers[1].key;
          playState = true;
        }
      } else {
        const storedData = localStorage.getItem(`trailers_${movieId}`);
        if (storedData) {
          const trailers = JSON.parse(storedData);
          if (trailers.length > 1 && trailers[1].key) {
            trailerKey = trailers[1].key;
            playState = true;
          }
        } else {
          console.log(
            "No trailers data available in local storage for movie",
            movieId
          );
        }
      }

      setTrailerKey(trailerKey);
      setPlay(playState);
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  const getGenresData = async () => {
    const response = await axios.get(
      `${baseUrl}/discover/movie?sort_by=popularity.desc&${apiKEY}&page=${page}&with_genres=${genres}`
    );
    const data = await response.data.results;
    setData(data);
  };
  const getDataBasedOnLanguage = async () => {
    const response = await axios.get(
      `${baseUrl}/discover/movie?sort_by=popularity.desc&${apiKEY}&page=${page}{page}&language=${language}&sort_by=popularity.desc`
    );
    const data = await response.data.results;
    setData(data);
  };
  const changeLanguage = async (value) => {
    setLanuage(value);
  };
  const getDataByRating = async (e) => {
    try {
      const response = await axios.get(
        `${baseUrl}/discover/movie?sort_by=${userElectRating}&${apiKEY}&page=${page}&`
      );
      const data = response.data.results;
      console.log("okkk", response);
      setData(data);
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };
  const handluserRating = async (e) => {
    const value = e.target.value;

    setUserElectRating(value);
    getDataByRating();
  };

  return (
    <div className="home">
      <div className="leftSideContainer">
        <h1>Sort & Filter</h1>
        <MenuIcon onClick={handleClick} />

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }}>
            <Filters
              handleChange={handleChange}
              changeLanguage={changeLanguage}
              handluserRating={handluserRating}
              getDataByRating={getDataByRating}
            />
          </Typography>
        </Popover>
      </div>
      {play && <VideoPlayer trailerKey={trailerKey} />}
      <div className="cardContainer">
        {data?.map((data) => {
          return (
            <>
              <Card
                data={data}
                fetchTrailer={fetchTrailer}
                handleRating={handleRating}
                addToFavorite={addToFavorite}
                addToWishList={addToWishList}
              />
            </>
          );
        })}

        {loading && <p>Loading...</p>}
      </div>

      <div className="btnContainer">
        <FaveroteBtn />
        <WishListBtn />
      </div>
    </div>
  );
}

export default Home;
