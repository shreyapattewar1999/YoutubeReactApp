import React, { useEffect, useState } from "react";
import { COMMENT_THREAD_API } from "../utils/constants";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const getComments = async () => {
    const data = await fetch(
      COMMENT_THREAD_API.replace("{0}", videoId) +
        process.env.REACT_APP_YOUTUBE_API_KEY
    );
    const jsonResponse = await data.json();
    // jsonResponse.items.sort(
    //   (a, b) =>
    //     new Date(a.snippet?.topLevelComment?.snippet?.publishedAt).getTime() >
    //     new Date(b.snippet?.topLevelComment?.snippet?.publishedAt).getTime()
    // );
    setComments(jsonResponse.items);
    console.log(jsonResponse.items);
  };

  const getPublishedTime = (commentDate) => {
    let publishedDate = new Date(commentDate);
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
        return currentDate.getMonth() - publishedDate.getMonth() + " year ago";
      }
      return currentDate.getMonth() - publishedDate.getMonth() + " months ago";
    } else if (currentDate.getDay() - publishedDate.getDay() > 0) {
      if (currentDate.getDay() - publishedDate.getDay() === 1) {
        return currentDate.getDay() - publishedDate.getDay() + " year ago";
      }
      return currentDate.getDay() - publishedDate.getDay() + " months ago";
    } else {
      return "Today";
    }
  };

  useEffect(() => {
    getComments();
  }, [videoId]);

  const handleShowMore = (comment) => {
    if (comment["showMore"]) {
      comment["showMore"] = !comment["showMore"];
    } else {
      comment["showMore"] = true;
    }
    setShowMore(!showMore);
  };

  const toggleReplyView = (comment) => {
    if (comment["showReplies"]) {
      comment["showReplies"] = !comment["showReplies"];
    } else {
      comment["showReplies"] = true;
    }
    setShowReplies(!showReplies);
  };

  return (
    <div className="m-4 w-[60rem]">
      <div className="text-xl font-bold pb-2 ">Comments</div>
      <div>
        {comments?.map((comment) => (
          <div
            key={comment.id}
            className="flex shadow-lg p-2 border-2 mb-2 pb-2 rounded-md border-gray-100"
            style={
              comment["showMore"]
                ? { height: "fit-content" }
                : { height: "min-height" }
            }
          >
            <img
              src={
                comment?.snippet?.topLevelComment?.snippet
                  ?.authorProfileImageUrl
              }
              alt="img"
              className="rounded-[50%] h-12 w-12 m-2"
            />
            <div className="pl-2">
              <div className="flex">
                <h4 className="font-bold pr-2">
                  {
                    comment?.snippet?.topLevelComment?.snippet
                      ?.authorDisplayName
                  }
                </h4>
                <span className="text-gray-600 text-sm pt-0.5">
                  {getPublishedTime(
                    comment.snippet?.topLevelComment?.snippet?.publishedAt
                  )}
                </span>
              </div>
              <span
                className="whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: comment["showMore"]
                    ? comment?.snippet?.topLevelComment?.snippet?.textDisplay
                    : comment?.snippet?.topLevelComment?.snippet?.textDisplay.substring(
                        0,
                        270
                      ),
                }}
              ></span>
              {/* <span>
              {comment["showMore"]
                ? comment?.snippet?.topLevelComment?.snippet?.textOriginal
                : comment?.snippet?.topLevelComment?.snippet?.textOriginal.substring(
                    0,
                    270
                  )}
            </span> */}
              {"  "}
              {comment?.snippet?.topLevelComment?.snippet?.textOriginal.length >
                270 && (
                <button
                  className="hover:underline text-blue-600"
                  onClick={() => handleShowMore(comment)}
                >
                  {comment["showMore"] ? "Read Less" : "Read More"}
                </button>
              )}
              <br />
              {comment?.snippet?.totalReplyCount > 0 && (
                <>
                  <div
                    className="flex text-blue-600 text-md w-fit pr-3 pt-1 pb-1 mb-2 font-bold align-middle hover:rounded-2xl hover:bg-blue-100"
                    onClick={() => toggleReplyView(comment)}
                  >
                    {comment["showReplies"] ? (
                      <AiOutlineDown className="align-middle h-6 w-10" />
                    ) : (
                      <AiOutlineUp className="align-middle h-6 w-10" />
                    )}
                    {/* {comment?.snippet?.totalReplyCount}{" "} */}
                    {comment?.snippet?.totalReplyCount > 1
                      ? "Show Replies"
                      : "Show Reply"}
                    <br />
                  </div>
                  {comment["showReplies"] && (
                    <div className="ml-3">
                      {comment.replies.comments.map((reply) => (
                        <div
                          key={reply.id}
                          className="flex shadow-lg p-2 border-2 mb-2 pb-2 rounded-md border-gray-100"
                        >
                          <img
                            src={reply?.snippet?.authorProfileImageUrl}
                            alt="img"
                            className="rounded-[50%] h-10 w-10 m-2"
                          />
                          <div className="pl-2">
                            <div className="flex">
                              <h4 className="font-bold pr-2">
                                {reply?.snippet?.authorDisplayName}
                              </h4>
                              <span className="text-gray-600 text-sm pt-0.5">
                                {getPublishedTime(reply?.snippet?.publishedAt)}
                              </span>
                            </div>
                            <span
                              className="whitespace-pre-wrap"
                              dangerouslySetInnerHTML={{
                                __html: reply?.snippet?.textDisplay,
                              }}
                            ></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
