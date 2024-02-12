import { createSlice } from "@reduxjs/toolkit";

const exitslice = createSlice({
  name: "exitSlice",
  initialState: { exiting: false },
  reducers: {
    setExit: (state) => {
      state.exiting = true;
    },
    notExit: (state) => {
      state.exiting = false;
    },
  },
});

export default exitslice;

export const exitAction = exitslice.actions;
