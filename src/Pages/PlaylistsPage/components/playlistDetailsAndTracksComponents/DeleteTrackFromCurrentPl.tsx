import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { deleteTrack } from "../../functions/DeleteTrack";
import { queryClient } from "../../../../utllties/queryClient";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const DeleteTrackFromCurrentPl: React.FC<{
  uri: string;
}> = ({ uri }) => {
  const [yesDelete, setIsYesDelete] = useState<boolean>(false);
  const [DeleteAlert, setDeleteAlert] = useState<boolean>(false);

  const [params] = useSearchParams();
  const currentPlID = params.get("pListId");
  console.log(currentPlID);
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
      mutate();
    }
  }, [yesDelete, mutate]);
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
