import { ChangeEvent, useState } from "react";
import { playlistItem, track } from "../../Pages/PlaylistsPage/types/Types";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { setTrackToPlaylist } from "../../Pages/PlaylistsPage/functions/setTrackToPlaylist";
import { getUserPlaylists } from "../../Pages/PlaylistsPage/functions/userPlayists";
import { AnimatePresence, motion } from "framer-motion";
import SelectPlForm from "./SelectPlForm";
import AddToPlButton from "./AddToPlButton";
import IframeTrack from "./IframeTrack";
import DeleteTrackFromCurrentPl from "./DeleteTrackFromCurrentPl";
import { useLocation } from "react-router-dom";
import { myToken } from "../../utllties/tokenAndDurationControl";
import {
  useAppDispatch,
  useAppSelector,
} from "../../stateRoot/reduxHooks";
import { nonUserPlaylistsActions } from "../../stateRoot/nonUserPLaylists";
import IframeLocalInfo from "./IframeLocalInfo";

const TrackItem: React.FC<{ track: track }> = ({ track }) => {
  const [show, setShow] = useState<boolean>(false);
  const [playlistID, setPlayistId] = useState("");
  const [playlistUpdated, setplaylistUpdated] = useState<boolean>(false);

  const offsetExist = localStorage.getItem("offset");
  const limitExist = localStorage.getItem("limit");
  const location = useLocation();
  const token = myToken();
  const userToken = token?.userToken;
  const nonUserToken = token?.nonUserToken;
  const nonUserPlayLists = useAppSelector((state) => state.nonUserPlaylists);
  const dispatch = useAppDispatch();

  /////
  //check location path to hide and show the appropirate content
  const searchPage = location.pathname.includes("search");
  const albumTracksPAge = location.pathname.includes("album");
  const localPlaylists = location.pathname.includes("localPlaylists");

  ////

  const { data: userPlaylists, isFetched }: UseQueryResult<playlistItem> =
    useQuery({
      queryKey: ["userPlaylists"],
      queryFn: getUserPlaylists,
      enabled: userToken !== undefined,
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
      userToken && mutate();
      nonUserToken &&
        dispatch(
          nonUserPlaylistsActions.addTrackToNonUserPlaylist({
            playlistID,
            uri: track.id,
          })
        );
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
          <IframeLocalInfo track={track} />
          <AnimatePresence>
            {!show && !localPlaylists && (
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
                userPlaylists={userToken ? userPlaylists! : nonUserPlayLists} ////
                isFetched={isFetched}
              />
            )}
          </AnimatePresence>
          {!offsetExist &&
            !limitExist &&
            !show &&
            !albumTracksPAge &&
            !searchPage && (
              <DeleteTrackFromCurrentPl uri={track.uri} id={track.id} />
            )}
        </nav>
      </AnimatePresence>
    </motion.div>
  );
};

export default TrackItem;
