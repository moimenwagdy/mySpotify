import { createSlice } from "@reduxjs/toolkit";
import { playlistItem } from "../Pages/PlaylistsPage/types/Types";

const userplaylist: playlistItem = {
  items: [],
  limit: 0,
  offset: 0,
  next: "",
  previous: "",
  total: 0,
};
const playlistPages = createSlice({
  name: "playlistPages",
  initialState: {
    offsetDefaultVal: 8,
    userPlaylists: userplaylist,
  },
  reducers: {
    setUserPlaylists: (state, action) => {
      state.userPlaylists = { ...action.payload };
    },
  },
});

export default playlistPages;

export const pagesAction = playlistPages.actions;
