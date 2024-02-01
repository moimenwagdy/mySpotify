import { CategoriesResponse } from "../utllties/interfaces";
import { motion } from "framer-motion";
const Catrgories: React.FC<CategoriesResponse> = ({ categories }) => {
  console.log(categories);
  return (
    <>
      {categories &&
        categories.items.map((item) => {
          return (
            <motion.li
              variants={{ visible: { opacity: 1, scale: 1 } }}
              initial={{ opacity: 0, scale: 0.8 }}
              key={item.id}
              className=" sm:max-w-[240px] flex justify-center cursor-pointer relative">
              <img
                src={item.icons[0].url}
                className="max-w-[120%]  lg:w-full "></img>
              <p className="absolute bottom-6">{item.name}</p>
            </motion.li>
          );
        })}
    </>
  );
};

export default Catrgories;
