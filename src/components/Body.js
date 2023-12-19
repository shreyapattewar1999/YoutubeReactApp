import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Head from "./Head";
import { YOUTUBE_API } from "../utils/constants";
import { setPageToken, setSearchQuery, updateVideos } from "../utils/appSlice";
import { useDispatch } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();

  const getVideos = async () => {
    const data = await fetch(
      YOUTUBE_API.replace("{0}", "") + process.env.REACT_APP_YOUTUBE_API_KEY
    );
    const jsonResponse = await data.json();
    dispatch(updateVideos({ videosList: jsonResponse.items }));
    dispatch(setPageToken({ pageToken: jsonResponse.nextPageToken }));
  };

  useEffect(() => {
    dispatch(setSearchQuery({ searchQuery: "" }));
    dispatch(setPageToken({ nextPageToken: "" }));
    getVideos();
  }, []);

  return (
    <>
      <Head></Head>

      <div className="flex">
        <Sidebar></Sidebar>
        <Outlet />
        {/* <MainContainer></MainContainer> */}
      </div>
    </>
  );
};

export default Body;
