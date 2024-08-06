import TapItem from "./TapItem";
import LightDarkControler from "./LightDarkControler";

const HomeTapsNavbar = () => {
  return (
    <nav className="relative w-full mx-auto bg-offWhite dark:bg-dark rounded-md mt-24 md:mt-24">
      <ul className="w-1/2 mx-auto flex justify-center items-center">
        <TapItem main title="Home" destination="/" />
        <TapItem main title="Categories" destination="categories" />
        <TapItem main title="PlayLists" destination="playLists" />
        <TapItem main title="Search" destination="search" />
      </ul>
      <div className="absolute -top-10 md:top-1/2 left-5 md:-translate-y-1/2">
        <LightDarkControler />
      </div>
    </nav>
  );
};

export default HomeTapsNavbar;
