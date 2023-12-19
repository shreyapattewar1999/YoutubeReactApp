import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: {},
  },
  reducers: {
    cacheResults: (state, action) => {
      Object.assign(state.searchResults, action.payload);
    },
  },
});

export default searchSlice.reducer;
export const { cacheResults } = searchSlice.actions;

// Build LRU Cache
// limit cache size to store x number of keys(lets say 100), if cache size goes beyond 100, start removing from top
