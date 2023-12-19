export const YOUTUBE_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&maxResults=20&pageToken={0}&key=";
export const YOUTUBE_SEARCH_API =
  "http://suggestqueries.google.com/complete/search?client=firefox&type=video&key=AIzaSyBMI3h24fvyZJgHZzRNOITWUCgToRVlR_M&ds=yt&q=";

export const YOUTUBE_SEARCH_BY_KEYWORD_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&q={0}&pageToken={1}&regionCode=IN&key=";

export const COMMENT_THREAD_API =
  "https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&videoId={0}&key=";

export const CHANNEL_INFO_API =
  "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id={0}&key=";

export const GET_VIDEO_INFO_BY_ID_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id={0}&key=";

export const GET_REPLIES_BY_COMMENT_ID_API =
  "https://youtube.googleapis.com/youtube/v3/comments?part=snippet&parentId=UgwnQpt9bhcTQxPwtex4AaABAg&key=";

export const GET_LIVE_VIDEOS_API =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&key=";
