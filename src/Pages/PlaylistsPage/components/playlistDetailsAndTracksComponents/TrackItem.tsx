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
import { Link, useLocation } from "react-router-dom";

const TrackItem: React.FC<{ track: track }> = ({ track }) => {
  const [show, setShow] = useState<boolean>(false);
  const [playlistID, setPlayistId] = useState("");
  const [playlistUpdated, setplaylistUpdated] = useState<boolean>(false);
  const offsetExist = localStorage.getItem("offset");
  const limitExist = localStorage.getItem("limit");
  const location = useLocation();
  /////
  const searchPage = location.pathname.includes("search");
  const albumTracksPAge = location.pathname.includes("album");
  ////
  const { data: userPlaylists, isFetched }: UseQueryResult<playlistItem> =
    useQuery({
      queryKey: ["userPlaylists"],
      queryFn: getUserPlaylists,
    });
  ////

  const { mutate } = useMutation({
    mutationKey: ["addTrack"],
    mutationFn: () => setTrackToPlaylist(playlistID!, track.uri),
  });
  /////
  ////
  function userPlaylistListHandle() {
    setShow((prv) => !prv);
  }
  /////
  const playlistExist = userPlaylists?.total !== 0;
  ////
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
        <nav className=" gap-y-1 md:gap-y-0 h-24 sm:h-10 md:h-20 lg:h-10 flex flex-col sm:flex-row justify-start text-sm items-center w-full gap-x-3">
          <p className="text-lightGreen  rounded-md my-1 bg-dark min-w-44 sm:min-w-32 lg:min-w-44 text-center px-2">
            {track.artists[0].name}
          </p>
          <>
            <span className="text-lightGreen bg-dark px-2 rounded ">
              <Link className="" to={`/artists/${track.artists[0].id}`}>
                Albums
              </Link>
            </span>
          </>
          <AnimatePresence>
            {!show && (
              <AddToPlButton
                playlistUpdated={playlistUpdated}
                userPlaylistListHandle={userPlaylistListHandle}
              />
            )}
          </AnimatePresence>
          <AnimatePresence>
            {show && playlistExist && (
              <SelectPlForm
                CloseAddTrackToPlaylist={CloseAddTrackToPlaylist}
                addTrackToPlaylist={addTrackToPlaylist}
                changeHandler={changeHandler}
                userPlaylists={userPlaylists!}
                isFetched={isFetched}
              />
            )}
          </AnimatePresence>
          {!offsetExist &&
            !limitExist &&
            !show &&
            !albumTracksPAge &&
            !searchPage && <DeleteTrackFromCurrentPl uri={track.uri} />}
        </nav>
      </AnimatePresence>
    </motion.div>
  );
};

export default TrackItem;
