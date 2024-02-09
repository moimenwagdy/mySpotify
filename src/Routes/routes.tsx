import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../Pages/WelcomePage";
import HomePage from "../Pages/HomePage";
import { loader as authLoader } from "../Pages/HomePage";
import { action as logOutAction } from "../Pages/LogoutPage";
import MainLayout from "../Pages/MainLayout";

import CategoriesPage from "../Pages/CategoriesPage/CategoriesPage"; // Loader as CategoriesLoader,

import Albums from "../Pages/Albums";
import Search from "../Pages/Search";
import PlayLists from "../Pages/PlaylistsPage/PlayListsPage";
import ErrorFallback from "../components/ErrorFallback";
import PlaylistItems from "../Pages/PlaylistsPage/PlaylistItems";
import UserPlaylist from "../Pages/UserPlaylist";
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
        // loader: CategoriesLoader,
      },
      { path: "albums", element: <Albums /> },
      { path: "search", element: <Search /> },
      {
        path: "playlists",
        element: <PlayLists />,
        children: [
          { index: true },
          { path: ":id", element: <PlaylistItems /> },
          { path: "userplaylist", element: <UserPlaylist /> },
        ],
      },
    ],
  },
  { index: true, element: <WelcomePage /> },
  { path: "logout", action: logOutAction },
]);

export default route;
