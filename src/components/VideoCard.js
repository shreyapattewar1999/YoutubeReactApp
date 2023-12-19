import React from "react";
import { useSelector } from "react-redux";
import "../../src/App.css";

const VideoCard = ({ video_info, stats }) => {
  const searchQuerySelector = useSelector((store) => store.app.searchQuery);

  const getFormattedCount = (count) => {
    if (count > 10000000) {
      return (count / 10000000).toFixed(2) + " crore";
    }
    if (count > 100000) {
      return (count / 100000).toFixed(2) + " lakh";
    }
    return count;
  };
  return (
    <div className="w-72 shadow-lg p-2 m-1 border-2 border-gray-100 rounded-md">
      <img
        src={video_info?.thumbnails.medium.url}
        alt="thumbnail"
        className="rounded-lg"
      ></img>
      <h4 className="font-bold ellipsis max-w-[220px]">{video_info?.title}</h4>
      <span className="italic">{video_info?.channelTitle}</span>
      <br />
      {stats?.viewCount && getFormattedCount(stats?.viewCount) + " views"}{" "}
      <br />
      {stats?.likeCount && getFormattedCount(stats?.likeCount) + " likes"}
      {searchQuerySelector === "Live" && (
        <span className="text-red-700 font-bold align-text-bottom">Live</span>
      )}
    </div>
  );
};

export default VideoCard;
