import { createSlice } from "@reduxjs/toolkit";
import playlistData from "../Pages/PlaylistsPage/types/Types";

const initial: playlistData = {
  data: {
    message: "",
    playlist: {
      items: [],
      limit: 0,
      offset: 0,
      next: "",
      previous: "",
      total: "",
    },
  },
};

const playlistsResponseSlice = createSlice({
  name: "playlistsResponseSlice",
  initialState: initial,
  reducers: {
    setPlaylistData: (state, action) => {
      state.data.playlist = action.payload.playlists;
      state.data.message = action.payload.message;
    },
  },
});

export default playlistsResponseSlice;

export const exitAction = playlistsResponseSlice.actions;
