import NavMenuItem from "../uiux/TapsNavItem";

const NavTaps = () => {
  return (
    <nav className=" w-full mx-auto bg-light rounded-md mt-10 md:mt-14">
      <ul className="flex justify-center items-center">
        <NavMenuItem title="Categories" destination="categories" />
        <NavMenuItem title="PlayLists" destination="playLists" />
        <NavMenuItem title="Albums" destination="albums" />
        <NavMenuItem title="Search" destination="search" />
      </ul>
    </nav>
  );
};

export default NavTaps;
