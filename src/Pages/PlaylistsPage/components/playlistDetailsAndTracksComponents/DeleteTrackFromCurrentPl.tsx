import { useMutation } from "@tanstack/react-query";
import Button from "../../../../uiux/Button";
import { useSearchParams } from "react-router-dom";
import { deleteTrack } from "../../functions/DeleteTrack";
import { queryClient } from "../../../../utllties/queryClient";
const DeleteTrackFromCurrentPl: React.FC<{ uri: string }> = ({ uri }) => {
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
    mutate();
  }
  isSuccess && console.log(data);
  isError && console.log(error);
  return (
    <Button
      onClick={deleteTrackFromCurrentPl}
      title="Delete"
      className="bg-dark text-white px-1"
    />
  );
};

export default DeleteTrackFromCurrentPl;
