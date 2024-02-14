import { createSlice } from "@reduxjs/toolkit";

const playlistPages = createSlice({
  name: "playlistPages",
  initialState: { offsetDefaultVal: 10 },
  reducers: {},
});

export default playlistPages;

export const exitAction = playlistPages.actions;
