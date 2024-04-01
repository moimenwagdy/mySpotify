import { motion } from "framer-motion";

const HomeMainCardSectionItem: React.FC<{
  imgUrl?: string;
  header?: string;
  imgMargin?: boolean;
}> = ({ imgUrl, header, imgMargin }) => {
  const currentScreenWidth = window.innerWidth;

  return (
    <motion.li
      variants={{
        visible: {
          y: 0,
          opacity: 1,
          rotate: -10,
          scaleY: 1.15,
        },
      }}
      initial={{
        y: -700,
        opacity: currentScreenWidth < 640 ? 0 : 1,
        rotate: -10,
      }}
      className="min-h-[390px] sm:min-h-[340px] md:min-h-[385px] lg:min-h-[520px]  cursor-pointer w-1/2 md:w-1/4 lg:w-1/5 overflow-hidden bg-white/50 rounded-xl h-[115%]    ">
      <img
        className={`scale-y-[.90] max-w-[100%] ${imgMargin ? "mt-6" : ""}`}
        alt="mainPageImg"
        src={imgUrl}></img>

      <h1 className=" bg-darkGreen  w-[120%] px-3 sm:px-7 -ms-5 sm:-ms-4 font-LilitaOne text-sm md:text-md lg:text-2xl rotate-[10deg] mt-10">
        {header}
      </h1>
    </motion.li>
  );
};

export default HomeMainCardSectionItem;
