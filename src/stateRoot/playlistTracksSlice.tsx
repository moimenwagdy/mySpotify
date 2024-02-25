import { createSlice } from "@reduxjs/toolkit";

const playlisTracksSlice = createSlice({
  name: "playlisTracksSlice",
  initialState: { offset: 0 },
  reducers: {
    increase: (state) => {
      state.offset += 7;
    },
    decrease: (state) => {
      state.offset -= 7;
    },
    reset: (state) => {
      state.offset = 0;
    },
  },
});

export default playlisTracksSlice;
export const playlisTracksActions = playlisTracksSlice.actions;
