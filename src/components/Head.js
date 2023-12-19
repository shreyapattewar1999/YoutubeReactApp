import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  openMenu,
  setPageToken,
  setSearchQuery,
  toggleMenu,
  updateVideos,
} from "../utils/appSlice";
import { useLocation, useNavigate } from "react-router-dom";
import {
  YOUTUBE_SEARCH_API,
  YOUTUBE_SEARCH_BY_KEYWORD_API,
} from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { YOUTUBE_API } from "../utils/constants";

const Head = () => {
  const dispatch = useDispatch();
  const searchCache = useSelector((store) => store.search);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const location = useLocation();
  const [activeSearch, setActiveSearch] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache.searchResults[search]) {
        setSearchResults(searchCache.searchResults[search]);
        return;
      }
      getSearchResults();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const getSearchResults = async () => {
    if (search?.length === 0) {
      return;
    }
    setActiveSearch(0);
    // console.log("API CALL" + search);
    const data = await fetch(YOUTUBE_SEARCH_API + search);
    const jsonResponse = await data.json();
    // console.log(jsonResponse[1]);
    dispatch(cacheResults({ [search]: jsonResponse[1] }));
    setSearchResults(jsonResponse[1]);
  };

  const getPopularVideos = async () => {
    // since here we dont need to pass any page token, hence page token is replaced with ""
    const data = await fetch(
      YOUTUBE_API.replace("{0}", "") + process.env.REACT_APP_YOUTUBE_API_KEY
    );
    const jsonResponse = await data.json();
    // console.log(jsonResponse.items);
    dispatch(updateVideos({ videosList: jsonResponse.items }));
  };

  const navigateToHome = () => {
    if (location.pathname !== "/") {
      dispatch(openMenu());
      dispatch(setSearchQuery({ searchQuery: "" }));
    }

    navigate("/");
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const keyDownHandler = (e) => {
    if (e.keyCode === 38 && activeSearch > 0) {
      setActiveSearch(activeSearch - 1);
    } else if (e.keyCode === 40 && activeSearch < searchResults.length) {
      setActiveSearch(activeSearch + 1);
    }
  };
  // eslint-disable-next-line no-unused-vars
  const searchVideos = async (query) => {
    // console.log(query);
    const api =
      YOUTUBE_SEARCH_BY_KEYWORD_API.replace("{0}", query).replace("{1}", "") +
      process.env.REACT_APP_YOUTUBE_API_KEY;
    const data = await fetch(api);
    const response = await data.json();
    // console.log(response.items);
    dispatch(updateVideos({ videosList: response.items }));
    dispatch(setSearchQuery({ searchQuery: query }));
    dispatch(setPageToken({ pageToken: response.nextPageToken }));
    navigateToHome();
  };

  return (
    <div className="grid grid-flow-col pt-2 shadow-lg z-20">
      <div className="flex h-[40px] pl-2 col-span-1">
        <img
          src="/hamburger_menu.png"
          alt="menu-button"
          onClick={toggleMenuHandler}
        />
        <img
          src="/youtube_logo.png"
          alt="youtube-logo"
          className="h-[40px]"
          onClick={async () => {
            await getPopularVideos();
            // dispatch(getPopularVideos());
            dispatch(setSearchQuery(""));

            navigateToHome();
          }}
        />
      </div>
      <div className="col-span-9 pt-2 px-10">
        <div>
          <input
            type="text"
            className="border-2 w-1/2 rounded-l-full border-gray-400 align-middle px-2"
            placeholder="Search"
            value={search}
            onKeyDown={(e) => {
              // console.log(e.key);
              if (e.key === "Enter") {
                if (!searchResults || searchResults[activeSearch] !== search) {
                  searchVideos(search);
                } else {
                  setSearch(searchResults[activeSearch]);
                  searchVideos(searchResults[activeSearch]);
                }
                setShowSuggestions(false);
              } else {
                keyDownHandler(e);
              }
            }}
            onChange={(e) => {
              setShowSuggestions(true);
              setSearch(e.target.value);
              console.log(e.target.value);
            }}
            onFocus={(e) => setShowSuggestions(true)}
            onBlur={(e) => setTimeout(() => setShowSuggestions(false), 500)} //onBlur means on focus out
          />
          <button className="border-2 border-l-0 border-gray-400 px-2 py-1 rounded-r-full bg-gray-100 align-middle">
            <img
              src="/search_icon.png"
              alt="search icon"
              className="w-4 h-4"
              onClick={() => searchVideos(search)}
            />
          </button>
        </div>
        {searchResults && searchResults.length > 0 && showSuggestions && (
          <div className="absolute bg-white py-1 px-1 w-[29rem] shadow-lg rounded-lg border-gray-200 border z-10">
            <ul>
              {searchResults.map((res, index) => (
                <li
                  key={index}
                  style={
                    activeSearch === index
                      ? {
                          backgroundColor: `rgb(243,244, 246)`,
                        }
                      : {}
                  }
                  className="cursor-pointer p-1 m-1 shadow-sm hover:bg-gray-100 rounded-md"
                >
                  <div
                    className="flex align-middle"
                    onClick={(e) => {
                      setSearch(res);
                      searchVideos(res);
                    }}
                  >
                    <div className="pt-1">
                      <img
                        src="/search_icon.png"
                        alt="search icon"
                        className="w-4 h-4"
                      />{" "}
                    </div>
                    <span className="px-2 align-middle">{res}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-2 align-left">
        <img src="/user-icon.png" alt="user-icon" className="h-[50px] pl-2" />
      </div>
    </div>
  );
};

export default Head;
