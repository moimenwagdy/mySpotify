import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../Pages/WelcomePage";
import HomePage from "../Pages/HomePage";
import { loader as authLoader } from "../Pages/HomePage";
import { action as logOutAction } from "../Pages/LogoutPage";
import MainLayout from "../Pages/MainLayout";
import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage"; // Loader as CategoriesLoader,
import Albums from "../Pages/Albums";
import Search from "../Pages/Search";
import PlayListsPage from "../Pages/PlaylistsPage/PlayListsPage";
import ErrorFallback from "../components/ErrorFallback";
import { loader } from "../Pages/PlaylistsPage/components/PlaylistItems";
import UserPlaylist from "../Pages/UserPlaylist";
import CategoriesPlaylistContainer from "../Pages/PlaylistsPage/CategoriesPlaylistContainer";
import PlaylistDetails, {
  loader as playlistDetailsLoader,
} from "../Pages/PlaylistsPage/components/PlaylistDetails";
// import { current } from "@reduxjs/toolkit";
const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "tokenLoader",
    errorElement: <ErrorFallback />,
    children: [
      {
        path: "home",
        element: <HomePage />,
        loader: authLoader,
      },

      {
        path: "categories",
        element: <CategoriesPage />,
        children: [],
      },
      { path: "albums", element: <Albums /> },
      { path: "search", element: <Search /> },
      {
        path: "playlists",
        children: [
          { index: true, element: <PlayListsPage /> },
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
              { index: true, element: <CategoriesPlaylistContainer /> },
              {
                path: "playlistdetails",
                element: <PlaylistDetails />,
                loader: playlistDetailsLoader,
              },
            ],
          },
        ],
      },

      { path: "userplaylist", element: <UserPlaylist /> },
    ],
  },

  { index: true, element: <WelcomePage /> },
  { path: "logout", action: logOutAction },
]);

export default route;
