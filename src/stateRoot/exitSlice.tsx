import { createSlice } from "@reduxjs/toolkit";

const exitslice = createSlice({
  name: "exitSlice",
  initialState: { exiting: false, showNewPlaylistForm: false },
  reducers: {
    setExit: (state) => {
      state.exiting = true;
    },
    notExit: (state) => {
      state.exiting = false;
    },
    newPlaylisToggler: (state) => {
      state.showNewPlaylistForm = !state.showNewPlaylistForm;
    },
  },
});

export default exitslice;

export const exitAction = exitslice.actions;
