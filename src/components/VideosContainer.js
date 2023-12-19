import React from "react";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { YOUTUBE_API, YOUTUBE_SEARCH_BY_KEYWORD_API } from "../utils/constants";
import { updateVideos, setPageToken } from "../utils/appSlice";

const VideosContainer = () => {
  const dispatch = useDispatch();
  const videoSelector = useSelector((store) => store.app.videosList);
  const nextPageToken = useSelector((store) => store.app.nextPageToken);
  const searchQuerySelector = useSelector((store) => store.app.searchQuery);

  const getMoreVideos = async () => {
    if (nextPageToken?.length === 0) {
      return;
    }
    let data;
    if (searchQuerySelector) {
      let api =
        YOUTUBE_SEARCH_BY_KEYWORD_API.replace(
          "{0}",
          searchQuerySelector
        ).replace("{1}", nextPageToken) + process.env.REACT_APP_YOUTUBE_API_KEY;
      data = await fetch(api);
    } else {
      data = await fetch(
        YOUTUBE_API.replace("{0}", nextPageToken) +
          process.env.REACT_APP_YOUTUBE_API_KEY
      );
    }
    const jsonResponse = await data.json();
    console.log(jsonResponse?.items);
    dispatch(
      updateVideos({
        videosList: jsonResponse?.items,
        isAppend: true,
      })
    );
    dispatch(setPageToken({ pageToken: jsonResponse.nextPageToken }));
  };

  // there is issue with Youtube Data Api for searching with keyword, it returns duplicate results while scrolling hence there is Unique key error in console
  return (
    <InfiniteScroll
      dataLength={videoSelector?.length}
      next={getMoreVideos}
      hasMore={nextPageToken}
      loader={<h4>Loading....</h4>}
    >
      <div className="flex flex-wrap justify-evenly">
        {videoSelector.map((video) => {
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
              {/* {console.log(
                video.id === "string" ? video.id : video.id?.videoId
              )} */}
              <VideoCard
                video_info={video?.snippet}
                stats={video?.statistics}
              ></VideoCard>
            </Link>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

export default VideosContainer;
