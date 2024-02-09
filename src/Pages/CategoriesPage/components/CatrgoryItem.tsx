import { Link } from "react-router-dom";
import { CategoriesResponse } from "../../../utllties/interfaces";
import { motion } from "framer-motion";
const CatrgoryItem: React.FC<CategoriesResponse> = ({ categories }) => {
  console.log(categories);
  return (
    <>
      {categories &&
        categories.items.map((item) => {
          console.log(item.id);
          return (
            <Link to={`/playlists/${item.id}`}>
              <motion.li
                variants={{ visible: { opacity: 1, scale: 1 } }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  scale: 0.97,
                  transition: { type: "spring", stiffness: 500 },
                }}
                key={item.id}
                className="flex justify-center cursor-pointer relative">
                <img
                  src={item.icons[0].url}
                  alt="CatImg"
                  className="w-80 sm:w-72 md:w-64 rounded-md"></img>
                <p className="absolute bottom-6">{item.name}</p>
              </motion.li>
            </Link>
          );
        })}
    </>
  );
};

export default CatrgoryItem;
