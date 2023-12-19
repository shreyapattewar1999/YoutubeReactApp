import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const LiveChat = () => {
  const [isShowChat, setShowChat] = useState(true);

  return (
    <div className="border-2 m-2 mt-10 bg-gray-300 rounded-md shadow-md">
      {!isShowChat && (
        <div
          className="flex font-medium bg-gray-400 p-2 rounded-md"
          onClick={() => setShowChat(!isShowChat)}
        >
          <span className="pr-2">Show Chat </span>
          <div className="self-center">
            <AiOutlineDown />
          </div>
        </div>
      )}
      {isShowChat && (
        <div className="max-h-[40vh] overflow-y-scroll p-2">
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
          Shreya
          <br />
        </div>
      )}
      {isShowChat && (
        <div
          className="flex font-medium bg-gray-400 p-2 rounded-md"
          onClick={() => setShowChat(!isShowChat)}
        >
          <span className="pr-2">Hide Chat </span>
          <div className="self-center">
            <AiOutlineUp />
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
