import React from "react";
import "../../src/App.css";
import { useSelector } from "react-redux";

const SuggestionCard = ({ video_info, stats }) => {
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
    <div className="flex shadow-lg border-2 border-gray-100 rounded-md mb-2">
      <img
        src={video_info?.thumbnails.medium.url}
        alt="thumbnail"
        className="rounded-lg h-30 w-40 m-2"
      ></img>
      <div>
        <h2 className="font-bold ellipsis">{video_info?.title}</h2>
        <span className="italic">{video_info?.channelTitle}</span>
        <br />
        {stats?.viewCount &&
          getFormattedCount(stats?.viewCount) + " views"}{" "}
        <br />
        {stats?.likeCount && getFormattedCount(stats?.likeCount) + " likes"}
        {searchQuerySelector === "Live" && (
          <>
            {/* <br /> */}
            <span className="text-red-700 font-bold align-text-bottom">
              Live
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default SuggestionCard;
