import HeaderLeftSection from "./HeaderLeftSection";
import HeaderRightSection from "./HeaderRightSection";

const Header = () => {
  return (
    <header className=" flex flex-col z-[1]">
      <section className="flex h-24">
        <HeaderLeftSection />
        <HeaderRightSection />
      </section>
    </header>
  );
};

export default Header;
