import { AnimatePresence, motion } from "framer-motion";
// import HearderLink from "./HearderLink";
import { useState } from "react";
import HearderLink from "./HearderLink";

const navLinks = [
  { to: "/", title: "Home" },
  { to: "/playlists", title: "Playlists" },
  { to: "/categories", title: "Categories" },
  { to: "/search", title: "Search" },
  { to: "/about", title: "About" },
  { to: "/contact", title: "Contact" },
];

const Header = () => {
  const [renderControl, setRederControl] = useState<boolean>(false);
  const currentScreenWidth = window.innerWidth;
  const smallScreen = currentScreenWidth < 640;
  function renderHanlder() {
    setTimeout(() => {
      setRederControl(true);
    }, 200);
  }

  function endHoverHandler() {
    setRederControl(false);
  }
  const ele = document.querySelector("html");
  const currentmodeisDark = ele?.classList.contains("dark");
  return (
    <header className=" flex flex-col z-[1]">
      <section className="flex h-24">
        <section className=" flex justify-start shadow-xl shadow-black/20 w-3/5 rounded-br-[100%] h-24 absolute top-0 -left-3 bg-dark">
          <div className="ms-10 flex flex-col justify-center items-start w-2/4">
            <img
              className="rounded-xl h-118"
              src="../../images/Logo.png"
              width="180"
              alt="Logo"
            />
          </div>
        </section>
        <AnimatePresence>
          <motion.section
            layout
            onHoverStart={renderHanlder}
            onHoverEnd={endHoverHandler}
            variants={{
              init: { x: 0, y: smallScreen ? -560 : -120 },
              now: { x: 100 },
            }}
            initial="now"
            animate="init"
            transition={{ duration: 1, type: "spring", stiffness: 80 }}
            whileHover={{
              y: smallScreen ? -50 : 0,
              width: "105%",
              borderRadius: 0,
              right: smallScreen ? -18 : -30,
            }}
            className={` ${
              renderControl
                ? "flex justify-center items-center"
                : "flex flex-col"
            }  justify-center items-center shadow-xl shadow-black/20  z-10 w-4/5 sm:w-3/5 h-full sm:h-[240px]  absolute -top-4 -right-4  rounded-bl-[100%] bg-darkGreen hover:bg-darkGreen/70 dark:bg-darkerGreen hover:dark:bg-darkerGreen/60 transition-colors duration-[1500ms] `}>
            <motion.ul
              variants={{
                init: {
                  transition: { staggerChildren: 0.5 },
                },
              }}
              className="flex flex-col sm:flex-row gap-x-4 gap-y-3 sm:gap-y-0 justify-center items-center">
              {renderControl &&
                navLinks.map((nav) => {
                  return (
                    <motion.li
                      className="text-xl md:text-lg"
                      variants={{ init: { x: 0, y: 0, opacity: 1 } }}
                      initial={{ x: 100, y: -60, opacity: 0.5 }}>
                      <HearderLink to={nav.to} title={nav.title} />
                    </motion.li>
                  );
                })}
            </motion.ul>
            {!renderControl && (
              <ul className="self-end me-8 -mt-28">
                {navLinks.map((nav) => {
                  return (
                    <motion.li
                      className="text-base text-end me-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}>
                      <HearderLink to={nav.to} title={nav.title} />
                    </motion.li>
                  );
                })}
              </ul>
            )}
            <motion.img
              variants={{
                basic: { y: 0 },
                anim: {
                  rotate: renderControl ? 160 : 20,
                },
              }}
              initial="basic"
              animate="anim"
              transition={{ duration: 0.5, type: "spring" }}
              src={`${
                currentmodeisDark ? "../images/8C.png" : "../images/8.png"
              }  `}
              className="absolute  right-0 bottom-0 me-6 sm:me-8 mb-3 w-16 "></motion.img>
          </motion.section>
        </AnimatePresence>
      </section>
    </header>
  );
};

export default Header;
