import AlternativeHeader from "./AlternativeHeader";
import HeaderLeftSection from "./HeaderLeftSection";
const Header = () => {
  return (
    <header className=" flex flex-col z-[1]">
      <section className="flex h-24">
        <HeaderLeftSection />
        <AlternativeHeader />
      </section>
    </header>
  );
};

export default Header;
