import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { deleteTrack } from "../../functions/DeleteTrack";
import { queryClient } from "../../../../utllties/queryClient";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { myToken } from "../../../../utllties/tokenAndDurationControl";
import { useAppDispatch } from "../../../../stateRoot/reduxHooks";
import { nonUserPlaylistsActions } from "../../../../stateRoot/nonUserPLaylists";

const DeleteTrackFromCurrentPl: React.FC<{
  uri: string;
  id: string;
}> = ({ uri, id }) => {
  const [yesDelete, setIsYesDelete] = useState<boolean>(false);
  const [DeleteAlert, setDeleteAlert] = useState<boolean>(false);
  const token = myToken();
  const userToken = token?.userToken;
  const nonUserToken = token?.nonUserToken;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const currentPlID = params.get("pListId");
  const dispatch = useAppDispatch();
  console.log(currentPlID);
  console.log(uri);
  const { mutate, isSuccess, data, isError, error } = useMutation({
    mutationKey: ["deleteTrack"],
    mutationFn: () => deleteTrack(currentPlID!, uri),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["plTracks"] });
    },
  });
  function deleteTrackFromCurrentPl() {
    setDeleteAlert(true);
  }

  useEffect(() => {
    if (yesDelete) {
      if (userToken) {
        mutate();
      }
      if (nonUserToken) {
        dispatch(
          nonUserPlaylistsActions.deleteTrackFromNonUserPlaylist({ uri: id })
        );
        const updatedUrl = currentPlID?.split(",");
        const filterdUrl = updatedUrl?.filter((item) => {
          console.log(item);
          return item !== id;
        });
        filterdUrl!.length > 0
          ? navigate(
              `/playlists/localPlaylists?pListId=${filterdUrl!.join("%2C")}`
            )
          : setTimeout(() => {
              navigate(`/playlists/localPlaylists?pListId=empty`);
            }, 2000);
      }
    }
  }, [
    yesDelete,
    mutate,
    userToken,
    nonUserToken,
    dispatch,
    id,
    currentPlID,
    navigate,
  ]);
  isSuccess && console.log(data);
  isError && console.log(error);
  function deletePermision() {
    setIsYesDelete(true);
  }
  function cancelDeletion() {
    setIsYesDelete(false);
    setDeleteAlert(false);
  }
  return (
    <div className="ms-0 sm:ms-auto">
      {!DeleteAlert ? (
        <motion.button
          onClick={deleteTrackFromCurrentPl}
          className="bg-dark text-white px-2 rounded ">
          Delete
        </motion.button>
      ) : (
        <span className="flex justify-center items-center gap-x-1 text-xs">
          <p className=""> sure? delete this track !</p>
          <button
            onClick={deletePermision}
            className=" text-white bg-dark px-1 rounded">
            Yes
          </button>
          <button onClick={cancelDeletion} className="bg-dark px-1 rounded">
            Cancel
          </button>
        </span>
      )}
    </div>
  );
};

export default DeleteTrackFromCurrentPl;
