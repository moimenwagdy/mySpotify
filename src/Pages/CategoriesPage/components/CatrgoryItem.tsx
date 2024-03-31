import { Link } from "react-router-dom";
import { CategoriesResponse } from "../../../utllties/interfaces";
import { motion } from "framer-motion";
import { exitAction } from "../../../stateRoot/exitSlice";
import { useAppDispatch, useAppSelector } from "../../../stateRoot/reduxHooks";

const CatrgoryItem: React.FC<CategoriesResponse> = ({ categories }) => {
  const dispatch = useAppDispatch();
  const limit = useAppSelector((state) => state.playlistPages.offsetDefaultVal);
  return (
    <>
      {categories &&
        categories.items.map((item) => {
          return (
            <Link
              to={`/playlists/${item.id}?limit=${limit}&offset=0`}
              key={item.id}
              onClick={() => {
                dispatch(exitAction.notExit());
              }}>
              <motion.li
                variants={{ visible: { opacity: 1, scale: 1 } }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{
                  scale: 0.97,
                  transition: { type: "spring", stiffness: 500 },
                }}
                exit={{ opacity: 0 }}
                className="flex justify-center cursor-pointer relative">
                <img
                  src={item.icons[0].url}
                  alt="CatImg"
                  className="w-80 sm:w-72 md:w-64 rounded-md cursor-pointer"></img>
                <p className="absolute bottom-6 rounded-md cursor-pointer">{item.name}</p>
              </motion.li>
            </Link>
          );
        })}
    </>
  );
};

export default CatrgoryItem;
