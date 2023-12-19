import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openMenu, updateVideos, setSearchQuery } from "../utils/appSlice";
import "../../src/App.css";
import { YOUTUBE_SEARCH_BY_KEYWORD_API, YOUTUBE_API } from "../utils/constants";
import { AiFillHome, AiFillTrophy, AiFillBulb } from "react-icons/ai";
import { ImMusic } from "react-icons/im";
import { GiGamepad, GiHanger } from "react-icons/gi";
import {
  BiSolidMoviePlay,
  BiSolidShoppingBag,
  BiSolidNews,
  BiSolidPlaylist,
} from "react-icons/bi";

const Sidebar = () => {
  const categories = [
    { name: "Sports", icon: <AiFillTrophy /> },
    { name: "Gaming", icon: <GiGamepad /> },
    { name: "Movies", icon: <BiSolidMoviePlay /> },
    { name: "Shopping", icon: <BiSolidShoppingBag /> },
    { name: "News", icon: <BiSolidNews /> },
    { name: "Music", icon: <ImMusic /> },
    { name: "Learning", icon: <AiFillBulb /> },
    { name: "Fashion & Beuty", icon: <GiHanger /> },
  ];

  let navigate = useNavigate();
  const dispatch = useDispatch();

  const getVideos = async () => {
    const data = await fetch(
      YOUTUBE_API.replace("{0}", "") + process.env.REACT_APP_YOUTUBE_API_KEY
    );
    const jsonResponse = await data.json();
    dispatch(updateVideos({ videosList: jsonResponse.items }));
  };

  const navigateToHome = () => {
    getVideos();
    dispatch(setSearchQuery(""));
    dispatch(openMenu());
    navigate("/");
  };

  const getVideosByCategory = async (category) => {
    const data = await fetch(
      YOUTUBE_SEARCH_BY_KEYWORD_API.replace("{0}", category).replace(
        "{1}",
        ""
      ) + process.env.REACT_APP_YOUTUBE_API_KEY
    );
    const jsonResponse = await data.json();
    dispatch(updateVideos({ videosList: jsonResponse.items }));
  };

  const isMenuOpen = useSelector((store) => store.app.isMenuOpenFlag);

  if (!isMenuOpen) return;

  return (
    <div className="shadow-lg m-2 p-2 text-lg sidebar">
      {/* <h1 className="font-bold">Library</h1> */}
      <ul>
        <li onClick={navigateToHome} className="flex">
          <div className="pt-1 pr-2 align-middle">
            <AiFillHome />
          </div>
          <span>Home</span>
        </li>
        {/* <li>
          <BiSolidPlaylist />
          Playlist
        </li>
        <li>History</li>
        <li>Your Videos</li>
        <li>Watch Later</li> */}
      </ul>
      {/* <br /> */}
      <hr />
      <br />
      <h1 className="font-bold pb-2">Explore</h1>
      <ul>
        {categories.map((category, index) => (
          <li
            className="flex"
            key={index}
            onClick={() => getVideosByCategory(category.name)}
          >
            <div className="pt-[0.32rem] pr-2 align-middle">
              {category.icon}
            </div>{" "}
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
