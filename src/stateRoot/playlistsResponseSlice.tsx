import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface playlistIte {
  description: string;
  href: string;
  id: string;
  images: { url: string }[];
  name: string;
  owner: { display_name: string };
  tracks: { href: string; total: number };
}

interface playlistTyp {
  playlists: {
    items: playlistIte[];
    limit: number;
    offset: number;
    next: string;
    previous: string;
    total: string;
  };
  message: string;
}

const initial: playlistTyp = {
  playlists: {
    items: [],
    limit: 0,
    next: "",
    offset: 0,
    previous: "",
    total: "",
  },
  message: "",
};
const playlistsResponseSlice = createSlice({
  name: "playlistsResponseSlice",
  initialState: initial,
  reducers: {
    setPlaylistData: (
      state,
      action: PayloadAction<{ playlists: playlistTyp }>
    ) => {
      state.playlists = action.payload.playlists.playlists;
      state.message = action.payload.playlists.message;
    },
  },
});

export default playlistsResponseSlice;

export const exitAction = playlistsResponseSlice.actions;
