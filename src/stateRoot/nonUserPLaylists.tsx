import { createSlice } from "@reduxjs/toolkit";
import { playlistItem } from "../Pages/PlaylistsPage/types/Types";

const existInLocalStorage = localStorage.getItem("nonUserPlaylist");
const parsednonUserPlaylistsFromLocalStorage = JSON.parse(existInLocalStorage!);
const initialState: playlistItem = {
  items: existInLocalStorage ? parsednonUserPlaylistsFromLocalStorage : [],
  limit: 0,
  offset: 0,
  next: "",
  previous: "",
  total: 0,
};

const nonUserPlaylists = createSlice({
  name: "nonUserPlaylists",
  initialState: initialState,
  reducers: {
    addNewNonUserPlaylist: (state, action) => {
      const existInLocalStorage = localStorage.getItem("nonUserPlaylist");
      if (existInLocalStorage) {
        state.items = [...JSON.parse(existInLocalStorage)];
      }
      state.items = [...state.items, action.payload];
      localStorage.setItem("nonUserPlaylist", JSON.stringify(state.items));
    },
    addTrackToNonUserPlaylist: (state, action) => {
      const targetPlaylist = state.items.find((item) => {
        return item.id === action.payload.playlistID;
      });
      if (targetPlaylist) {
        if (targetPlaylist.uris.includes(action.payload.uri)) {
          return;
        } else
          targetPlaylist!.uris = [...targetPlaylist!.uris, action.payload.uri];
      }
      localStorage.setItem("nonUserPlaylist", JSON.stringify(state.items));
    },
    deleteTrackFromNonUserPlaylist: (state, action) => {
      const targetPlaylist = state.items.find((item) => {
        return item.uris.includes(action.payload.uri);
      });
      targetPlaylist &&
        targetPlaylist?.uris.splice(
          targetPlaylist?.uris.indexOf(action.payload.uri),
          1
        );
      localStorage.setItem("nonUserPlaylist", JSON.stringify(state.items));
    },
    deletePlaylist: (state, action) => {
      console.log(action.payload.id);
      const targetPlaylist = state.items.find((item) => {
        return item.id === action.payload.id;
      });
      targetPlaylist &&
        state.items.splice(state.items.indexOf(targetPlaylist!), 1);
      localStorage.setItem("nonUserPlaylist", JSON.stringify(state.items));
    },
  },
});

export default nonUserPlaylists;
export const nonUserPlaylistsActions = nonUserPlaylists.actions;
