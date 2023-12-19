import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpenFlag: true,
    videosList: [],
    nextPageToken: "",
    searchQuery: "",
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpenFlag = !state.isMenuOpenFlag;
    },
    closeMenu: (state) => {
      state.isMenuOpenFlag = false;
    },
    openMenu: (state) => {
      state.isMenuOpenFlag = true;
    },
    updateVideos: (state, action) => {
      if (!action.payload?.videosList) return;
      if (action.payload.isAppend) {
        state.videosList.push(...action.payload.videosList);
        return;
      }
      state.videosList = [...action.payload?.videosList];
    },
    setPageToken: (state, action) => {
      state.nextPageToken = action.payload.pageToken;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload.searchQuery;
    },
  },
});

export default appSlice.reducer;
export const {
  toggleMenu,
  closeMenu,
  openMenu,
  updateVideos,
  setPageToken,
  setSearchQuery,
} = appSlice.actions;
