import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
const LoadingIndecator: React.FC = () => {
  return (
    <div className="flex mx-auto w-1/4 justify-center relative mt-24 min-h-[120vh]">
      <motion.button
        className="text-lightGreen text-5xl absolute"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: [0, 1, 0] },
        }}
        animate="visible"
        initial="hidden"
        transition={{
          repeat: Infinity,
          duration: 1,
          repeatDelay: 2,
        }}>
        <FontAwesomeIcon icon={faPause} />
      </motion.button>
      <motion.button
        className="text-lightGreen text-5xl absolute"
        variants={{
          x: { opacity: 0 },
          y: {
            opacity: [0, 1, 0],
          },
        }}
        initial="x"
        animate="y"
        transition={{
          repeat: Infinity,
          duration: 1,
          delay: 1,
          repeatDelay: 2,
        }}>
        <FontAwesomeIcon icon={faPlay} />
      </motion.button>
      <motion.button
        className="text-lightGreen text-5xl absolute"
        variants={{
          b: { opacity: 0 },
          c: { opacity: [0, 1, 0] },
        }}
        initial="b"
        animate="c"
        transition={{
          repeat: Infinity,
          duration: 1,
          delay: 2,
          repeatDelay: 2,
        }}>
        <FontAwesomeIcon icon={faStop} />
      </motion.button>
      <p className="mt-14 font-rubik font-[600] ">
        Loading{" "}
        {"...".split("").map((dot, index) => {
          return (
            <motion.span
              key={index}
              className="text-lightGreen tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 2,
                delay: (index === 1 && 1) || (index === 2 && 2) || 0,
              }}>
              {dot}
            </motion.span>
          );
        })}
      </p>
    </div>
  );
};

export default LoadingIndecator;
