import { ChangeEvent, useState } from "react";
import { playlistItem, track } from "../../types/Types";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { setTrackToPlaylist } from "../../functions/setTrackToPlaylist";
import { getUserPlaylists } from "../../functions/userPlayists";
import { AnimatePresence, motion } from "framer-motion";
import SelectPlForm from "./SelectPlForm";
import AddToPlButton from "./AddToPlButton";
import IframeTrack from "./IframeTrack";
import DeleteTrackFromCurrentPl from "./DeleteTrackFromCurrentPl";
import { Link } from "react-router-dom";

const TrackItem: React.FC<{ track: track }> = ({ track }) => {
  const [show, setShow] = useState<boolean>(false);
  const [playlistID, setPlayistId] = useState("");
  const [playlistUpdated, setplaylistUpdated] = useState<boolean>(false);
  /////
  const { data: userPlaylists }: UseQueryResult<playlistItem> = useQuery({
    queryKey: ["userPlaylists"],
    queryFn: getUserPlaylists,
  });
  ////

  const { mutate } = useMutation({
    mutationKey: ["addTrack"],
    mutationFn: () => setTrackToPlaylist(playlistID!, track.uri),
  });
  /////
  const offsetExist = localStorage.getItem("offset");
  const limitExist = localStorage.getItem("offset");
  ////
  function userPlaylistListHandle() {
    setShow((prv) => !prv);
  }
  /////
  function addTrackToPlaylist() {
    if (playlistID !== "") {
      setTimeout(() => {
        setplaylistUpdated(true);
      }, 1000);
      mutate();
      setTimeout(() => {
        setplaylistUpdated(false);
        setPlayistId("");
      }, 2500);
    }
    setShow(false);
  }
  /////
  function changeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setPlayistId(e.target.value);
  }
  function CloseAddTrackToPlaylist() {
    setShow(false);
  }

  return (
    <motion.div
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate="visible"
      className="w-full"
      layout>
      <IframeTrack id={track.id} />
      <AnimatePresence>
        <nav className="flex flex-col sm:flex-row justify-start text-sm items-center w-full gap-x-3">
          <p className="text-lightGreen  rounded-md my-1 bg-dark min-w-44 text-center px-2">
            {track.artists[0].name}
          </p>
          <Link
            className="bg-dark text-lightGreen px-2"
            to={`/albums/${track.artists[0].id}`}>
            Albums
          </Link>

          <div className="flex text-lightGreen gap-x-1">
            <AddToPlButton
              show={show}
              playlistUpdated={playlistUpdated}
              userPlaylistListHandle={userPlaylistListHandle}
            />
            <SelectPlForm
              CloseAddTrackToPlaylist={CloseAddTrackToPlaylist}
              addTrackToPlaylist={addTrackToPlaylist}
              show={show}
              changeHandler={changeHandler}
              userPlaylists={userPlaylists!}
            />
            {!offsetExist && !limitExist && !show && (
              <DeleteTrackFromCurrentPl uri={track.uri} />
            )}
          </div>
        </nav>
      </AnimatePresence>
    </motion.div>
  );
};

export default TrackItem;
