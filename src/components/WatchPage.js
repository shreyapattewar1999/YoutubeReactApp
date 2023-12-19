import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMenu } from "../utils/appSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import Comments from "./Comments";
import VideoDescription from "./VideoDescription";
import { CHANNEL_INFO_API, GET_VIDEO_INFO_BY_ID_API } from "../utils/constants";
import Suggestions from "./Suggestions";
import LiveChat from "./LiveChat";

const WatchPage = () => {
  const [currentVideoId, setCurrentVideoId] = useState();
  const [videoInfo, setVideoInfo] = useState();
  const [channelInfo, setChannelInfo] = useState({});

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  const searchQuerySelector = useSelector((store) => store.app.searchQuery);

  const getChannelInfo = async () => {
    const data = await fetch(
      CHANNEL_INFO_API.replace(
        "{0}",
        location.state?.videoInfo.snippet?.channelId
      ) + process.env.REACT_APP_YOUTUBE_API_KEY
    );
    const jsonResponse = await data.json();
    setChannelInfo(jsonResponse?.items[0]);
    // console.log(jsonResponse.items);
  };

  const getVideoInfo = async () => {
    const data = await fetch(
      GET_VIDEO_INFO_BY_ID_API.replace("{0}", searchParams.get("v")) +
        process.env.REACT_APP_YOUTUBE_API_KEY
    );
    const jsonResponse = await data.json();
    setVideoInfo(jsonResponse?.items?.snippet);
    console.log(jsonResponse.items[0]);

    await getChannelInfo();
  };

  const getLiveChatDetails = async () => {
    const liveVideo = await fetch(
      "https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&key=AIzaSyBMI3h24fvyZJgHZzRNOITWUCgToRVlR_M&id=" +
        searchParams.get("v")
    );
    const liveVideoData = await liveVideo.json();
    let url =
      "https://youtube.googleapis.com/youtube/v3/liveChat/messages?liveChatId={0}&part=snippet&key=AIzaSyBMI3h24fvyZJgHZzRNOITWUCgToRVlR_M";
    let updatedUrl = url.replace(
      "{0}",
      liveVideoData?.items[0]?.liveStreamingDetails?.activeLiveChatId
    );
    console.log(updatedUrl);
    const liveMessages = await fetch(updatedUrl);
    const jsonResponse = await liveMessages.json();
    console.log(jsonResponse);
  };

  useEffect(() => {
    setCurrentVideoId(searchParams.get("v"));
    if (searchQuerySelector === "Live") {
      // getLiveChatDetails();
    }
    if (location?.state?.videoInfo) {
      console.log(location?.state?.videoInfo);
      setVideoInfo(location?.state?.videoInfo);
      getChannelInfo();
    } else {
      getVideoInfo();
    }
    // console.log(searchParams.get("v"));
    dispatch(closeMenu());
  }, [searchParams]);

  return (
    <div className="flex">
      <div className="p-2 m-2">
        <iframe
          className="h-[36rem] w-[60rem] mt-6 ml-6 mr-6 rounded-md shadow-md"
          src={"https://www.youtube.com/embed/" + searchParams.get("v")}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>

        <br />
        <div>
          {videoInfo && channelInfo && (
            <VideoDescription channelInfo={channelInfo} videoInfo={videoInfo} />
          )}
          {searchQuerySelector !== "Live" && (
            <Comments videoId={currentVideoId} />
          )}
        </div>
      </div>
      <div>
        {searchQuerySelector === "Live" && <LiveChat />}
        <Suggestions videoId={searchParams.get("v")} />
      </div>
    </div>
  );
};

export default WatchPage;
