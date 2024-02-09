import { NavLink } from "react-router-dom";

const TapItem: React.FC<{
  destination: string;
  title: string;
  main?: boolean;
}> = ({ title, destination, main }) => {
  return (
    <li className="p-2 text-center">
      <NavLink
        to={destination}
        className={({ isActive }) => {
          if (isActive && main) {
            return "bg-lightGreen p-2 rounded-sm text-white";
          }
          if (isActive && !main) {
            return "bg-secondryColor text-white p-2";
          }
          return "p-2 text-white  rounded-sm text-sm";
        }}>
        {title}
      </NavLink>
    </li>
  );
};

export default TapItem;
