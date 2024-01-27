import { motion } from "framer-motion";
import SearchForm from "../uiux/SearchForm";
import NavUserDataContainer from "../uiux/NavUserDataContainer";
import { Link } from "react-router-dom";
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
          className="flex justify-start shadow-xl shadow-black/20 w-2/4 rounded-br-[100%] h-24 absolute top-0 -left-3 bg-dark">
          <div className="ms-6 flex flex-col justify-center items-start">
            <h1 className=" text-xl text-lightGreen text-start  ">
              My Spotify
            </h1>
            <SearchForm />
          </div>
        </motion.section>
        <motion.section
          variants={{ init: { x: 0 }, now: { x: 100 } }}
          initial="now"
          animate="init"
          transition={{ duration: 1, type: "spring" }}
          whileHover={{ height: 150 }}
          className="px-6 shadow-xl shadow-black/20  z-10 w-3/5 h-14 absolute -right-3 top-0 rounded-bl-[100%] bg-darkGreen">
          <Link to="Profile">
            <h2 className="text-end absolute bottom-2 right-6 z-10 text-xl text-white">
              Profile
            </h2>
          </Link>
        </motion.section>
      </section>
      <NavUserDataContainer />
    </header>
  );
};

export default Header;
