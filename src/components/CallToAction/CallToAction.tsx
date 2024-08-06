import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const CallToAction = () => {
  const navigate = useNavigate();

  const navigateToCattegories = () => {
    navigate("/categories");
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="flex justify-center w-fit h-fit items-center absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] ">
      <button
        onClick={navigateToCattegories}
        className="text-lg font-bold py-3 px-6 bg-darkerGreen hover:bg-darkGreen rounded-md"
        type="button">
        Listen Now
      </button>
    </motion.section>
  );
};

export default CallToAction;
