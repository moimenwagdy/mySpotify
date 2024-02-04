import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../Pages/WelcomePage";
import HomePage from "../Pages/HomePage";
import { loader as authLoader } from "../Pages/HomePage";
import { action as logOutAction } from "../Pages/LogoutPage";
import MainLayout from "../Pages/MainLayout";

import CategoriesPage from "../Pages/CategoriesPage"; // Loader as CategoriesLoader,

import Albums from "../Pages/Albums";
import Search from "../Pages/Search";
import PalyLists from "../Pages/PalyListsPage";
import Error from "../components/Error";
const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "tokenLoader",
    errorElement: <Error />,
    children: [
      {
        path: "home",
        element: <HomePage />,
        loader: authLoader,
      },

      {
        path: "categories",
        element: <CategoriesPage />,
        errorElement: <Error />,
        // loader: CategoriesLoader,
      },
      { path: "albums", element: <Albums /> },
      { path: "search", element: <Search /> },
      { path: "playlists", element: <PalyLists /> },
    ],
  },
  { index: true, element: <WelcomePage /> },
  { path: "logout", action: logOutAction },
]);

export default route;
