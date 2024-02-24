import { playlisTracksActions } from "../../../stateRoot/playlistTracksSlice";
import { useAppDispatch, useAppSelector } from "../../../stateRoot/reduxHooks";
import { tracks } from "../types/Types";

const PlaylistTracksNavigationButtons: React.FC<{
  isLoading: boolean;
  data: tracks;
  tracksData: tracks;
}> = ({ data, isLoading, tracksData }) => {
  const disableNext: boolean = tracksData && tracksData.next === null;
  const disablePrevious: boolean = tracksData && tracksData.previous === null;
  const offset = useAppSelector((state) => state.playlistTracksSlice.offset);
  const dispatch = useAppDispatch();
  console.log(tracksData);
  return (
    <div className={`${isLoading && "hidden"} justify-end flex w-full pt-1`}>
      <div className="w-2/4 flex justify-around">
        <button
          disabled={disablePrevious}
          className={` hover:text-lightGreen ${
            disablePrevious
              ? "hover:text-simiDark/50 text-simiDark/50"
              : "text-white"
          }`}
          onClick={() => {
            dispatch(playlisTracksActions.decrease());
          }}>
          Previous
        </button>
        <button
          disabled={disableNext}
          className={` hover:text-lightGreen ${
            disableNext
              ? "hover:text-simiDark/50 text-simiDark/50"
              : "text-white"
          }`}
          onClick={() => {
            dispatch(playlisTracksActions.increase());
          }}>
          Next
        </button>
      </div>
      <div className="w-1/4 ">
        <p className="text-center">
          {offset + 7 > data.total ? data.total : offset + 7}/{data.total}
        </p>
      </div>
    </div>
  );
};

export default PlaylistTracksNavigationButtons;
