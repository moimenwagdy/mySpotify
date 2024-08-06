import NavUserDataContainer from "../Navbar/NavUserDataContainer";

const AlternativeHeader = () => {
  return (
    <section className="rounded-bl-lg pe-2 sm:px-6 flex justify-center z-10 bg-darkGreen  dark:bg-darkerGreen w-3/5 absolute h-28 -top-0 -right-0 shadow-xl shadow-black/20">
      <span className="ms-auto">
        <NavUserDataContainer />
      </span>
    </section>
  );
};

export default AlternativeHeader;
