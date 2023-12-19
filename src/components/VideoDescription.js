import React, { useState } from "react";

const VideoDescription = ({ channelInfo, videoInfo }) => {
  // console.log(videoInfo, channelInfo);
  const [showMore, setShowMore] = useState(true);

  const getFormattedCount = (count) => {
    if (count > 10000000) {
      return (count / 10000000).toFixed(2) + " crore";
    }
    if (count > 100000) {
      return (count / 100000).toFixed(2) + " lakh";
    }
    return count;
  };

  const getPublishedTime = (publishDate) => {
    let publishedDate = new Date(publishDate);
    const currentDate = new Date();
    if (currentDate.getFullYear() - publishedDate.getFullYear() > 0) {
      if (currentDate.getFullYear() - publishedDate.getFullYear() === 1) {
        return (
          currentDate.getFullYear() - publishedDate.getFullYear() + " year ago"
        );
      }
      return (
        currentDate.getFullYear() - publishedDate.getFullYear() + " years ago"
      );
    } else if (currentDate.getMonth() - publishedDate.getMonth() > 0) {
      if (currentDate.getMonth() - publishedDate.getMonth() === 1) {
        return currentDate.getMonth() - publishedDate.getMonth() + " month ago";
      }
      return currentDate.getMonth() - publishedDate.getMonth() + " months ago";
    } else if (currentDate.getDay() - publishedDate.getDay() > 0) {
      if (currentDate.getDay() - publishedDate.getDay() === 1) {
        return currentDate.getDay() - publishedDate.getDay() + " day ago";
      }
      return currentDate.getDay() - publishedDate.getDay() + " days ago";
    }
  };

  return (
    <div className="mb-5 ml-5 mr-5 w-[60rem]">
      <h1 className="text-2xl font-medium" style={{ wordBreak: "break-all" }}>
        {videoInfo?.snippet.title}
      </h1>
      <div className="flex shadow-xl p-2">
        <img
          src={channelInfo.snippet?.thumbnails?.default?.url}
          alt="img"
          className="rounded-[50%] h-14 w-14 m-2"
        />
        <div className="p-2">
          <span className="font-medium text-xl">
            {channelInfo?.snippet?.title}
          </span>
          <br />
          <span className="text-gray-600">
            {getFormattedCount(channelInfo?.statistics?.subscriberCount)}{" "}
            subscribers
          </span>
        </div>
      </div>
      <div className="bg-gray-200 rounded-lg shadow-lg p-3">
        <span className="font-medium">
          {getFormattedCount(parseInt(videoInfo?.statistics?.viewCount, 10))}{" "}
          views
        </span>

        <span className="font-medium pl-3">
          {getPublishedTime(videoInfo?.snippet?.publishedAt)}
        </span>
        <div
          className="whitespace-pre-wrap"
          // style={{ height: showMore ? "max-content" : "200px" }}
        >
          {showMore
            ? videoInfo?.snippet?.description.substring(0, 250)
            : videoInfo?.snippet?.description}
        </div>
        <button
          onClick={() => setShowMore(!showMore)}
          className="text-blue-600 underline"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

export default VideoDescription;
