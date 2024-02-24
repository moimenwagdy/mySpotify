import { playlisTracksActions } from "../../../stateRoot/playlistTracksSlice";
import { useAppDispatch, useAppSelector } from "../../../stateRoot/reduxHooks";
import { tracks } from "../Types";

const PlaylistTracksNavigationButtons: React.FC<{
  isLoading: boolean;
  data: tracks;
  tracksData: tracks;
}> = ({ data, isLoading, tracksData }) => {
  const offset = useAppSelector((state) => state.playlistTracksSlice.offset);
  const dispatch = useAppDispatch();
  console.log(tracksData);
  return (
    <div className={`${isLoading && "hidden"} justify-end flex w-full pt-1`}>
      <div className="w-2/4 flex justify-around">
        <button
          disabled={tracksData && tracksData.previous === null}
          className="text-white"
          onClick={() => {
            dispatch(playlisTracksActions.decrease());
          }}>
          Previous
        </button>
        <button
          disabled={tracksData && tracksData.next === null}
          className="text-white"
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
