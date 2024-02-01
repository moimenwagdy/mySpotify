import React from "react";
import { motion } from "framer-motion";
import { CategoriesResponse } from "../utllties/interfaces";
import Catrgories from "./CatrgoryItem";

const CategoriesContainer: React.FC<{
  data: CategoriesResponse | undefined;
}> = ({ data }) => {
  return (
    <motion.aside
      variants={{
        hidden: { y: 5 },
        visible: { y: 0 },
      }}
      initial="hidden"
      animate="visible"
      className=" bg-light rounded-md flex py-3 justify-center items-center  min-h-[560px]">
      <motion.ul
        variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
        className=" flex flex-wrap justify-center gap-3 ">
        <Catrgories categories={data?.categories} />
      </motion.ul>
    </motion.aside>
  );
};

export default CategoriesContainer;
