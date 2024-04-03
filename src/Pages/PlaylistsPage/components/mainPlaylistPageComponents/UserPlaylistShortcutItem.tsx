import { motion } from "framer-motion";
import { ReactNode } from "react";
import { playlistContent } from "../../types/Types";

const UserPlaylistShortcutItem: React.FC<{
  children?: ReactNode;
  item: playlistContent;
}> = ({ children, item }) => {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 20, opacity: 0 }}
      key={item?.id}
      className={`relative p-1 flex w-full justify-start bg-transparent outline outline-1 outline-lightGreen rounded gap-x-2 gap-y-1 lg:gap-y-0 text-dark  flex-col lg:flex-row items-center`}>
      <p className="font-bold text-white w-1/3 text-center  px-1 rounded">
        {item?.name}
      </p>
      {children}
      <p
        className={`text-xs text-center ${
          item?.description === "" ? "w-0 p-0" : "w-1/3 p-1"
        } rounded bg-light text-black dark:bg-dark dark:text-light `}>
        {item?.description}
      </p>
    </motion.div>
  );
};

export default UserPlaylistShortcutItem;
