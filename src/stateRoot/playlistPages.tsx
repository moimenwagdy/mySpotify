import { createSlice } from "@reduxjs/toolkit";

const playlistPages = createSlice({
  name: "playlistPages",
  initialState: {
    offsetDefaultVal: 8,
    playlistDetails: undefined,
  },
  reducers: {},
});

export default playlistPages;

export const pagesAction = playlistPages.actions;
