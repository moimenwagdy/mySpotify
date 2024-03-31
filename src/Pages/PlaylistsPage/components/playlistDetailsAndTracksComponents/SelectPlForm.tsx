import { motion } from "framer-motion";
import Button from "../../../../uiux/Button";
import { playlistContent, playlistItem } from "../../types/Types";
import { ChangeEvent } from "react";
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

  const newArr = userPlaylists && [
    ...userPlaylists.items.filter((e) => e.id !== pListId),
  ];

  console.log(newArr);

  console.log(newArr);
  console.log(userPlaylists);

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
    </>
  );
};

export default SelectPlForm;
