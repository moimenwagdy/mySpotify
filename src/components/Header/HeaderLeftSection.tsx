
const HeaderLeftSection = () => {
  return (
    <section className=" flex justify-start shadow-xl shadow-black/20 w-3/5  h-24 absolute top-0 left-0 bg-dark">
      <div className="ms-1 md:ms-10 flex flex-col justify-center items-start w-2/4">
        <img
          className="rounded-xl h-118"
          src="../../images/Logo.png"
          width="180"
          alt="Logo"
        />
      </div>
    </section>
  );
};

export default HeaderLeftSection;
