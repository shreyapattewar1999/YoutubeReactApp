import React, { useState } from "react";
import ButtonTab from "./ButtonTab";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setSearchQuery,
  setPageToken,
  updateVideos,
  openMenu,
} from "../utils/appSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { YOUTUBE_SEARCH_BY_KEYWORD_API } from "../utils/constants";

const ButtonList = () => {
  const [buttonList, setButtonList] = useState([]);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setButtonList([
      { name: "All", isClicked: false },
      { name: "Live", isClicked: false },
      { name: "Shorts", isClicked: false },
      { name: "Concerts", isClicked: false },
      { name: "Cricket", isClicked: false },
      { name: "News", isClicked: false },
      { name: "Tennis", isClicked: false },
      { name: "Cooking", isClicked: false },
      { name: "Drama", isClicked: false },
      { name: "Vlogs", isClicked: false },
      { name: "Travel", isClicked: false },
      { name: "Comedy", isClicked: false },
      { name: "Motivation", isClicked: false },
      { name: "Recently Uploaded", isClicked: false },
    ]);
  }, []);

  const navigateToHome = () => {
    if (location.pathname !== "/") {
      dispatch(openMenu());
      dispatch(setSearchQuery({ searchQuery: "" }));
    }

    navigate("/");
  };

  const searchVideos = async (query) => {
    // console.log(query);
    let api = "";
    if (query === "Live") {
      api =
        YOUTUBE_SEARCH_BY_KEYWORD_API.replace(
          "q={0}",
          "eventType=live"
        ).replace("{1}", "") +
        process.env.REACT_APP_YOUTUBE_API_KEY +
        "&relevanceLanguage=EN";
    } else {
      api =
        YOUTUBE_SEARCH_BY_KEYWORD_API.replace("{0}", query).replace("{1}", "") +
        process.env.REACT_APP_YOUTUBE_API_KEY;
    }
    const data = await fetch(api);
    const response = await data.json();
    // console.log(response.items);
    dispatch(updateVideos({ videosList: response.items }));
    dispatch(setPageToken({ pageToken: response.nextPageToken }));
    navigateToHome();
  };

  const btnClick = (index) => {
    // const buttonList = [...buttonList];
    const btn = buttonList[index];
    dispatch(setSearchQuery({ searchQuery: btn.name }));
    searchVideos(btn.name);
    if (btn.isClicked) {
      buttonList[index].isClicked = false;
      setButtonList([...buttonList]);
      return;
    }

    for (let i = 0; i < buttonList.length; i++) {
      if (i === index) {
        buttonList[i].isClicked = true;
      } else {
        buttonList[i].isClicked = false;
      }
    }
    // console.log(buttonList);
    setButtonList([...buttonList]);
  };

  return (
    <div className="flex ml-2">
      {buttonList.map((button, index) => (
        <ButtonTab key={index} index={index} btn={button} btnClick={btnClick} />
      ))}
    </div>
  );
};

export default ButtonList;

// https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=AIzaSyBMI3h24fvyZJgHZzRNOITWUCgToRVlR_M

// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing&key=AIzaSyBMI3h24fvyZJgHZzRNOITWUCgToRVlR_M
