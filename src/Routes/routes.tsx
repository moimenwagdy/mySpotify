import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../Pages/WelcomePage";
import HomePage from "../Pages/HomePage";
import { loader as authLoader } from "../Pages/HomePage";
import { action as logOutAction } from "../Pages/LogoutPage";
import MainLayout from "../Pages/MainLayout";
import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage"; // Loader as CategoriesLoader,
import Albums from "../Pages/Albums";
import Search from "../Pages/Search";
import PlayListsPage, {
  action as CreatePlayListAction,
} from "../Pages/PlaylistsPage/PlayListsPage";
import ErrorFallback from "../components/ErrorFallback";
import { loader } from "../Pages/PlaylistsPage/components/category'sPlaylistsComponents/PlaylistItems";
import CategoryPlaylistsContainerPage from "../Pages/PlaylistsPage/CategoryPlaylistsContainerPage";
import PlaylistDetailsPage, {
  loader as playlistDetailsLoader,
} from "../Pages/PlaylistsPage/PlaylistDetailsPage";
import { loader as playlistLengthCheck } from "../Pages/PlaylistsPage/components/mainPlaylistPageComponents/UsersNewPLManage";

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
          {
            index: true,
            element: <PlayListsPage />,
            loader: playlistLengthCheck,
            action: CreatePlayListAction,
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
              console.log(myCurrentParam);
              console.log(myNextParam);
              return myNextParam !== null || myCurrentParam !== null;
            },
            children: [
              { index: true, element: <CategoryPlaylistsContainerPage /> },
              {
                path: "playlistdetails",
                element: <PlaylistDetailsPage />,
                loader: playlistDetailsLoader,
              },
            ],
          },
        ],
      },
    ],
  },

  { index: true, element: <WelcomePage /> },
  { path: "logout", action: logOutAction },
]);

export default route;
