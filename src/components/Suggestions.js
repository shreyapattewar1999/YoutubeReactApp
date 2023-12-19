import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SuggestionCard from "./SuggestionCard";

const Suggestions = ({ videoId }) => {
  const videosSelector = useSelector((store) => store.app.videosList);
  return (
    <div className="mt-6 p-2">
      {videosSelector?.map((video) => {
        if (
          (typeof video.id === "string" ? video.id : video.id?.videoId) ===
          videoId
        ) {
          return <></>;
        }
        return (
          <Link
            to={`/watch?v=${
              typeof video.id === "string" ? video.id : video.id?.videoId
            }`}
            key={typeof video.id === "string" ? video.id : video.id?.videoId}
            state={{
              videoInfo: {
                videoId: video.id,
                snippet: video.snippet,
                statistics: video.statistics,
              },
            }}
          >
            <SuggestionCard
              video_info={video?.snippet}
              stats={video?.statistics}
            ></SuggestionCard>
          </Link>
        );
      })}
    </div>
  );
};

export default Suggestions;
