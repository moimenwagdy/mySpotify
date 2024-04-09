import { motion } from "framer-motion";
import Button from "../Button";
import {
  playlistContent,
  playlistItem,
} from "../../Pages/PlaylistsPage/types/Types";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SelectPlForm: React.FC<{
  isFetched: boolean;
  userPlaylists: playlistItem;
  changeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  addTrackToPlaylist: () => void;
  CloseAddTrackToPlaylist: () => void;
}> = ({
  userPlaylists,
  changeHandler,
  CloseAddTrackToPlaylist,
  addTrackToPlaylist,
}) => {
  const [params] = useSearchParams();
  const pListId = params.get("pListId");
  const selectRef = useRef<HTMLSelectElement>(null);
  const [correctSelection, setCorrectSelection] = useState<boolean>(false);
  const newArr = userPlaylists && [
    ...userPlaylists.items.filter((e) => e.id !== pListId),
  ];

  useEffect(() => {
    if (selectRef.current?.value === "false") {
      setCorrectSelection(true);
    } else setCorrectSelection(false);
    return () => {
      setCorrectSelection(false);
    };
  }, [correctSelection, selectRef.current?.value]);

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { delay: 0.3 } },
        }}
        initial="hidden"
        animate="visible"
        exit={{
          x: [-50, 4, 8, 11, 12],
          opacity: 0,
        }}
        className=" self-center lg:me-auto  justify-start items-center flex gap-x-2">
        <select
          ref={selectRef}
          onChange={changeHandler}
          name="userPlaylist"
          className=" text-center outline outline-1 rounded-md bg-transparent cursor-pointer">
          <option
            className=" bg-dark disabled:text-dark "
            value="false"
            defaultValue={""}>
            Select Playlist
          </option>
          {newArr &&
            newArr.map((item: playlistContent) => {
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
            disabled={correctSelection}
            onClick={addTrackToPlaylist}
            className="text-white hover:text-lightGreen dark:disabled:bg-transparent dark:disabled:text-white/50"
            title="Submit"
          />
          <Button
            onClick={CloseAddTrackToPlaylist}
            className="text-white hover:text-lightGreen"
            title="Cancel"
          />
        </div>
      </motion.div>
    </>
  );
};

export default SelectPlForm;
