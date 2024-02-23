import { configureStore } from "@reduxjs/toolkit";
import exitslice from "./exitSlice";
import playlistPages from "./playlistPages";
import playlistsResponseSlice from "./playlistsResponseSlice";
import playlistTracksSlice from "./playlistTracksSlice";

const store = configureStore({
  reducer: {
    exitSlice: exitslice.reducer,
    playlistPages: playlistPages.reducer,
    playlistResponseSlice: playlistsResponseSlice.reducer,
    playlistTracksSlice: playlistTracksSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
