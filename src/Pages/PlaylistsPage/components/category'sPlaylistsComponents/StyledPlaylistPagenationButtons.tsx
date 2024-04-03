import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../../stateRoot/reduxHooks";
export const StyledPlaylistPagenationButtons: React.FC<{
  title: string;
  offset: number;
  hidden: boolean;
}> = ({ title, offset, hidden }) => {
  const params = useParams();
  const id = params.id;
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
  );
  const data = useAppSelector(
    (state) => state.playlistResponseSlice.data.playlist
  );
  const moreThanTwo = data.items.length > 4;
  return (
    <Link
      hidden={hidden}
      to={`/playlists/${id}?limit=${defaultOffset}&offset=${offset}`}>
      <motion.div
        initial={{ opacity: 0, rotate: 0, x: title === "Prev" ? 50 : -50 }}
        animate={{
          opacity: [1],
          rotate: title === "Prev" ? -45 : 45,
          x: 0,
          transition: { stiffness: 50, duration: 0.2 },
        }}
        className={`rounded-xl dark:bg-darkGreen bg-lightGreen ${
          moreThanTwo ? "w-36 h-36 " : "w-28 h-28"
        } ${title === "Prev" ? "ps-2 text-start" : "pe-2 text-end"} `}>
        <button
          className={` ${
            title === "Prev" ? "ms-1 mt-4 rotate-45" : "me-1 mt-4 -rotate-45"
          } font-semibold `}>
          {title}
        </button>
      </motion.div>
    </Link>
  );
};
