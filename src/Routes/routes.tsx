import { createBrowserRouter } from "react-router-dom";
// import WelcomePage from "../Pages/WelcomePage";
import LandingPage from "../Pages/LandingPage";
import { loader as authLoader } from "../Pages/LandingPage";
import { action as logOutAction } from "../Pages/LogoutPage";
import MainLayout from "../Pages/MainLayout";
import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage";
import Albums from "../Pages/AlbumsPage/AlbumsPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import PlayListsPage, {
  action as CreatePlayListAction,
} from "../Pages/PlaylistsPage/PlayListsPage";
import ErrorFallback from "../components/ErrorFallback";
import { loader } from "../Pages/PlaylistsPage/components/category'sPlaylistsComponents/PlaylistItems";
import CategoryPlaylistsContainerPage from "../Pages/PlaylistsPage/CategoryPlaylistsContainerPage";
import PlaylistDetails_TracksItemsPage, {
  loader as playlistDetailsLoader,
} from "../Pages/PlaylistsPage/PlaylistDetails_TracksItemsPage";
import { loader as playlistLengthCheck } from "../Pages/PlaylistsPage/components/mainPlaylistPageComponents/UsersNewPLManage";
import AlbumTracksPage from "../Pages/TracksFromAlbums/AlbumTracksPage";
import { searchAction } from "../Pages/SearchPage/components/SearchForm";
import {
  LocalPlaylists,
  localPlaylistsLoader,
} from "../Pages/PlaylistsPage/LocalPlaylists";

// import { current } from "@reduxjs/toolkit";
const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "tokenLoader",
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: authLoader,
      },
      {
        path: "/categories",
        children: [{ index: true, element: <CategoriesPage /> }],
      },
      {
        path: "artists",
        children: [
          { index: true },
          {
            path: ":artistsID?",
            element: <Albums />,
          },
        ],
      },
      { path: "album", element: <AlbumTracksPage /> },
      { path: "search", element: <SearchPage />, action: searchAction },
      {
        path: "playlists",
        children: [
          {
            index: true,
            element: <PlayListsPage />,
            loader: playlistLengthCheck,
            action: CreatePlayListAction,
            id: "test",
          },
          {
            path: ":id?",
            loader: loader,
            id: "CPL",
            shouldRevalidate: ({ nextUrl }) => {
              const NexturlParams = new URLSearchParams(nextUrl.search);
              const myNextParam = NexturlParams.get("offset");
              const CurrenturlParams = new URLSearchParams(nextUrl.search);
              const myCurrentParam = CurrenturlParams.get("offset");

              return myNextParam !== null || myCurrentParam !== null;
            },
            children: [
              { index: true, element: <CategoryPlaylistsContainerPage /> },
              {
                path: "playlistdetails",
                element: <PlaylistDetails_TracksItemsPage />,
                loader: playlistDetailsLoader,
              },
              {
                path: "localPlaylists",
                element: <LocalPlaylists />,
                loader: localPlaylistsLoader,
              },
            ],
          },
        ],
      },
    ],
  },

  { path: "/logout", action: logOutAction },
]);

export default route;
