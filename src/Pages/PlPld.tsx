
import { Outlet } from "react-router";
import CategoriesPlaylistContainer from "./PlaylistsPage/CategoriesPlaylistContainer";

const PlPld = () => {
  return (
    <>
      <CategoriesPlaylistContainer />
      <Outlet />
    </>
  );
};

export default PlPld;
