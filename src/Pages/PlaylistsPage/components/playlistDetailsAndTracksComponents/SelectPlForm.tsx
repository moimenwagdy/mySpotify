import { AnimatePresence, motion } from "framer-motion";
import Button from "../../../../uiux/Button";
import { playlistItem } from "../../types/Types";
import { ChangeEvent } from "react";

const SelectPlForm: React.FC<{
  userPlaylists: playlistItem;
  show: boolean;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  addTrackToPlaylist: () => void;
  CloseAddTrackToPlaylist: () => void;
}> = ({
  show,
  userPlaylists,
  changeHandler,
  CloseAddTrackToPlaylist,
  addTrackToPlaylist,
}) => {
  const playlistExist = userPlaylists?.total !== 0;
  return (
    <>
      <AnimatePresence>
        {show && playlistExist && (
          <motion.div
            variants={{
              hidden: { x: 20, opacity: 0 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{ delay: !show ? 0.5 : 0.42 }}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="flex gap-x-2">
            <select
              onChange={changeHandler}
              name="userPlaylist"
              className=" text-center outline outline-1 rounded-md bg-transparent cursor-pointer">
              <option
                className="bg-lightGreen disabled:text-dark "
                value=""
                disabled
                selected>
                Select Playlist
              </option>
              {playlistExist &&
                userPlaylists?.items.map((item) => {
                  return (
                    <option
                      className="bg-dark cursor-pointer"
                      key={item.id}
                      value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
            <div className="flex gap-x-3 md:mx-2">
              <Button
                onClick={addTrackToPlaylist}
                className="text-white hover:text-lightGreen"
                title="Submit"
              />
              <Button
                onClick={CloseAddTrackToPlaylist}
                className="text-white hover:text-lightGreen"
                title="Cancel"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SelectPlForm;
