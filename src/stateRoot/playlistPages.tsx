import { createSlice } from "@reduxjs/toolkit";

const playlistPages = createSlice({
  name: "playlistPages",
  initialState: { offset: 10 },
  reducers: {
    nextPage: (state) => {
      state.offset += 10;
    },
    prevPage: (state) => {
      state.offset = state.offset - 10;
    },
    setOffset: (state, action) => {
      state.offset = action.payload;
    },
  },
});

export default playlistPages;

export const exitAction = playlistPages.actions;
