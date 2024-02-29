import { AnimatePresence, motion } from "framer-motion";

const AddToPlButton: React.FC<{
  show: boolean;
  userPlaylistListHandle: () => void;
  playlistUpdated: boolean;
}> = ({ playlistUpdated, show, userPlaylistListHandle }) => {
  return (
    <AnimatePresence>
      {!show && (
        <>
          <motion.button
            variants={{
              hidden: { y: 5, opacity: 0 },
              visible: { opacity: 1, y: 0 },
            }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ delay: !show ? 0.1 : 0 }}
            onClick={userPlaylistListHandle}
            className="bg-dark px-2 rounded-md">
            add to plylist
          </motion.button>
          <AnimatePresence>
            {playlistUpdated && (
              <motion.p
                variants={{
                  hidden: { y: 5, opacity: 0 },
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
      )}
    </AnimatePresence>
  );
};

export default AddToPlButton;
