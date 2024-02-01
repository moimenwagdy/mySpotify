
import { NavLink } from "react-router-dom";

const NavMenuItem: React.FC<{ destination: string; title: string }> = ({
  title,
  destination,
}) => {
  return (
    <li className="p-2 text-center">
      <NavLink
        to={destination}
        className={({ isActive }) => {
          return isActive
            ? "bg-lightGreen p-2 rounded-sm text-white"
            : "p-2 text-dark  rounded-sm text-sm";
        }}>
        {title}
      </NavLink>
    </li>
  );
};

export default NavMenuItem;
