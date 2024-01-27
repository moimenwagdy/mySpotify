import { createBrowserRouter } from "react-router-dom";
import WelcomePage from "../Pages/WelcomePage";
import HomePage from "../Pages/HomePage";
import { loader as authLoader } from "../Pages/HomePage";
import { action as logOutAction } from "../Pages/LogoutPage";
import MainLayout from "../Pages/MainLayout";
const route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    id: "tokenLoader",
    children: [
      {
        path: "home",
        element: <HomePage />,
        loader: authLoader,
      },
    ],
  },
  { index: true, element: <WelcomePage /> },
  { path: "logout", action: logOutAction },
]);

export default route;
