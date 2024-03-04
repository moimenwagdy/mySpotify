import { AnimatePresence, motion } from "framer-motion";

const AddToPlButton: React.FC<{
  userPlaylistListHandle: () => void;
  playlistUpdated: boolean;
}> = ({ playlistUpdated, userPlaylistListHandle }) => {
  return (
    <>
      <motion.button
        variants={{
          hidden: { y: 10, opacity: 0 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={userPlaylistListHandle}
        className="bg-dark px-2 rounded-md">
        add to plylist
      </motion.button>
      <AnimatePresence>
        {playlistUpdated && (
          <motion.p
            variants={{
              hidden: { y: 10, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden">
            Track Saved
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
};

export default AddToPlButton;
