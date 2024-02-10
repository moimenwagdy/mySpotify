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
import { loader } from "../Pages/PlaylistsPage/PlaylistItem";
import UserPlaylist from "../Pages/UserPlaylist";
import PlayListsItem from "../Pages/PlaylistsPage/PlayListsPage";
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
        errorElement: <ErrorFallback />,
      },
      { path: "albums", element: <Albums /> },
      { path: "search", element: <Search /> },
      {
        path: "playlists",
        element: <PlayListsPage />,
      },
      {
        path: "playlists/:id",
        element: <PlayListsItem />,
        loader: loader,
        id:"ff"
      },
      { path: "userplaylist", element: <UserPlaylist /> },
    ],
  },
  { index: true, element: <WelcomePage /> },
  { path: "logout", action: logOutAction },
]);

export default route;
