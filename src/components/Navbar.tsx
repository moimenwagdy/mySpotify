import { motion } from "framer-motion";
import SearchForm from "../uiux/SearchForm";
import NavUserDataContainer from "../uiux/NavUserDataContainer";

const Header = () => {
  return (
    <header className="sticky top-0 flex flex-col">
      <section className="flex h-24">
        <motion.section
          variants={{ aaa: { x: 0 }, bbb: { x: -100 } }}
          initial="bbb"
          animate="aaa"
          transition={{ duration: 1, type: "spring" }}
          whileHover={{ height: 110 }}
          className=" flex justify-start shadow-xl shadow-black/20 w-2/4 rounded-br-[100%] h-24 absolute top-0 -left-3 bg-dark">
          <div className="ms-6 flex flex-col justify-center items-start">
            <h1 className=" text-xl text-lightGreen text-start  ">
              My Spotify
            </h1>
            <SearchForm />
          </div>
        </motion.section>
        <motion.section
          variants={{
            init: { x: 0, y: -80, width: "75%" },
            now: { x: 100 },
          }}
          initial="now"
          animate="init"
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
          whileHover={{ y: 0, width: "60%" }}
          className=" flex text-end shadow-xl shadow-black/20  z-10 w-3/5 h-[180px]  absolute -top-4 -right-4  rounded-bl-[100%] bg-darkGreen">
          <div className="flex flex-col w-full me-7 gap-y-12 mt-4">
            <div className="self-end">
              <div className="w-12 flex flex-col text-center">
                <h2 className="text-base text-white">Home</h2>
                <h2 className="text-base text-white">Search</h2>
                <h2 className="text-base text-white">Profile</h2>
              </div>
            </div>
            <h2 className=" text-xl text-white ">Menu</h2>
          </div>
        </motion.section>
      </section>
      <NavUserDataContainer />
    </header>
  );
};

export default Header;
