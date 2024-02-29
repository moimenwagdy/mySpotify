import TapItem from "../uiux/TapItem";

const HomeTapsNavbar = () => {
  return (
    <nav className=" w-full mx-auto bg-light rounded-md mt-10 md:mt-14">
      <ul className="flex justify-center items-center">
        <TapItem main title="Home" destination="Home" />
        <TapItem main title="Categories" destination="categories" />
        <TapItem main title="PlayLists" destination="playLists" />
        <TapItem main title="Search" destination="search" />
      </ul>
    </nav>
  );
};

export default HomeTapsNavbar;
