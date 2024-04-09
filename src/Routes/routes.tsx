import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import { loader as authLoader } from "../Pages/HomePage/HomePage";
import { action as logOutAction } from "../Pages/LogoutPage";
import MainLayout from "../Pages/MainLayout";
import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage";
import Albums from "../Pages/AlbumsPage/AlbumsPage";
import SearchPage from "../Pages/SearchPage/SearchPage";
import PlayListsPage, {
  action as CreatePlayListAction,
} from "../Pages/PlaylistsPage/PlayListsMainPage";
import ErrorFallback from "../components/Error/ErrorFallback";
import { loader } from "../components/Playlist/PlaylistItems";
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
} from "../Pages/PlaylistsPage/LocalPlaylistsPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "tokenLoader",
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
