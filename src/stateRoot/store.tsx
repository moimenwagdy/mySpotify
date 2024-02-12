import { configureStore } from "@reduxjs/toolkit";
import exitslice from "./exitSlice";
import playlistPages from "./playlistPages";
import playlistsResponseSlice from "./playlistsResponseSlice";

const store = configureStore({
  reducer: {
    exitSlice: exitslice.reducer,
    playlistPages: playlistPages.reducer,
    playlistResponseSlice: playlistsResponseSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
