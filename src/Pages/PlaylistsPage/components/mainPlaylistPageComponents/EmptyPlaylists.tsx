import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";

export const EmptyPlaylists = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-center gap-y-2 flex flex-col">
      <p>Empty</p>
      <FontAwesomeIcon className="text-4xl text-lightGreen" icon={faFlag} />
    </motion.div>
  );
};
