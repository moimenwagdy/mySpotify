import { createSlice } from "@reduxjs/toolkit";

const exitslice = createSlice({
  name: "exitSlice",
  initialState: { exiting: false, modalExit: false },
  reducers: {
    setExit: (state) => {
      state.exiting = true;
    },
    notExit: (state) => {
      state.exiting = false;
    },
    setModalExitTrue: (state) => {
      state.modalExit = true;
    },
    setModalExitFalse: (state) => {
      state.modalExit = false;
    },
  },
});

export default exitslice;

export const exitAction = exitslice.actions;
