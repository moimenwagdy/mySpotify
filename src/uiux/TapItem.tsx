import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { playlisTracksActions } from "../stateRoot/playlistTracksSlice";
import { useAppDispatch } from "../stateRoot/reduxHooks";

const TapItem: React.FC<{
  destination: string;
  title: string;
  main?: boolean;
}> = ({ title, destination, main }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (title === "PlayLists") {
      dispatch(playlisTracksActions.reset());
    }
  });
  return (
    <li className="py-2 text-center text-sm font-[600] ">
      <NavLink
        to={destination}
        className={({ isActive }) => {
          if (isActive && main) {
            return "bg-lightGreen p-2 rounded-sm text-white";
          }
          if (isActive && !main) {
            return "bg-secondryColor text-white p-2";
          }
          return "p-2 text-dark rounded-sm text-sm hover:bg-secondryColor";
        }}>
        {title}
      </NavLink>
    </li>
  );
};

export default TapItem;
