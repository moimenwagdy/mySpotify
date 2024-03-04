import { motion } from "framer-motion";
import HearderLink from "./HearderLink";

const Header = () => {
  return (
    <header className=" flex flex-col z-[1]">
      <section className="flex h-24">
        <section className=" flex justify-start shadow-xl shadow-black/20 w-3/5 rounded-br-[100%] h-24 absolute top-0 -left-3 bg-dark">
          <div className="ms-10 flex flex-col justify-center items-start w-2/4">
            {/* <h1 className="font-rubik font-[500] text-2xl tracking-wider text-lightGreen text-start  ">
              My Spotify
            </h1> */}
            <img
              src="../../images/Spotify_Logo_CMYK_Green.png"
              width="180"
              alt="Logo"
            />
          </div>
        </section>
        <motion.section
          variants={{
            init: { x: 0, y: -145 },
            now: { x: 100 },
          }}
          initial="now"
          animate="init"
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
          whileHover={{ y: 0, width: "105%", borderRadius: 0, right: -2 }}
          className=" flex text-end shadow-xl shadow-black/20  z-10 w-3/5 h-[255px]  absolute -top-4 -right-4  rounded-bl-[100%] bg-darkGreen hover:bg-darkGreen/50 transition-colors duration-700 ">
          <div className="flex flex-col w-full me-10 gap-y-9 mt-2 pt-3">
            <div className="self-end">
              <div className="w-12 flex flex-col justify-end items-end">
                <HearderLink to="/home" title="Home" />
                <HearderLink to="/playlists" title="Playlists" />
                <HearderLink to="/categories" title="Categories" />
                <HearderLink to="/search" title="Search" />
                <HearderLink to="/about" title="About" />
                <HearderLink to="/contact" title="Contact" />
              </div>
            </div>
            <h2 className=" text-xl text-white ">Menu</h2>
          </div>
        </motion.section>
      </section>
    </header>
  );
};

export default Header;
