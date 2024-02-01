import { motion } from "framer-motion";

const Header = () => {
  return (
    <header className=" flex flex-col z-[1]">
      <section className="flex h-24">
        <section className=" flex justify-center shadow-xl shadow-black/20 w-3/5 rounded-br-[100%] h-24 absolute top-0 -left-3 bg-dark">
          <div className=" flex flex-col justify-center items-start w-2/4">
            <h1 className=" text-2xl tracking-wider  text-lightGreen text-start  ">
              My Spotify
            </h1>
          </div>
        </section>
        <motion.section
          variants={{
            init: { x: 0, y: -80 },
            now: { x: 100 },
          }}
          initial="now"
          animate="init"
          transition={{ duration: 1, type: "spring", stiffness: 80 }}
          whileHover={{ y: 0, width: "105%", borderRadius: 0, right: -2 }}
          className=" flex text-end shadow-xl shadow-black/20  z-10 w-3/5 h-[190px]  absolute -top-4 -right-4  rounded-bl-[100%] bg-darkGreen">
          <div className="flex flex-col w-full me-7 gap-y-12 mt-7">
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
    </header>
  );
};

export default Header;
