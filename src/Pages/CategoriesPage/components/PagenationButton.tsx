import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

const PagenationButton: React.FC<{
  xValue: number;
  icon: IconProp;
  onClick: () => void;
}> = ({ icon, xValue, onClick }) => {
  return (
    <motion.button
      variants={{
        hidden: { x: xValue, opacity: 0 },
        shown: {
          x: 0,
          opacity: 1,
          transition: { delay: 0.8 },
        },
      }}
      initial="hidden"
      animate="shown"
      whileHover={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
      className="z-10 text-lightGreen dark:text-darkGreen text-[80px]">
      <FontAwesomeIcon icon={icon} />
    </motion.button>
  );
};

export default PagenationButton;
