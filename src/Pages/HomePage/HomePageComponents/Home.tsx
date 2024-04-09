import { motion } from "framer-motion";
import { useEffect } from "react";
import landingSections from "../functions.tsx/MainPageSectionArray";
import HomeMainCardSectionItem from "./HomeMainCardSectionItem";

const Home: React.FC = () => {
  const currentScroll = window.scrollY;
  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      if (currentScroll < 100)
        window.scrollBy({
          top: 175,
          behavior: "smooth",
        });
    }, 1000);
    return () => {
      clearTimeout(scrollTimer);
    };
  }, [currentScroll]);
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      initial="hidden"
      animate="visible"
      className="p-6 bg-simiDark dark:bg-dark  mt-6 ">
      <motion.ul
        variants={{
          visible: {
            transition: { staggerChildren: 0.5 },
          },
        }}
        className="w-[70%] sm:w-full rounded-xl h-auto  mx-auto gap-y-10 sm:gap-y-0 text-center flex flex-wrap sm:flex-nowrap   bg-darkGreen dark:bg-darkerGreen gap-x-4 sm:gap-x-4 md:gap-x-10 lg:gap-x-6 justify-center items-center overflow-hidden">
        {landingSections.map((item) => {
          return (
            <HomeMainCardSectionItem
              key={item.header}
              header={item.header}
              imgUrl={item.imgUrl}
              imgMargin={item.imgMargin}
            />
          );
        })}
      </motion.ul>
    </motion.div>
  );
};

export default Home;
