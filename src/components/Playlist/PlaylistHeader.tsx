import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../stateRoot/reduxHooks";
import NormalPlaylistPagenationButtons from "./NormalPlaylistPagenationButtons";

const PlaylistHeader = () => {
  const [searchPrams] = useSearchParams();

  const playlistData = useAppSelector(
    (state) => state.playlistResponseSlice.data.playlist
  );
  const playlistMessage = useAppSelector(
    (state) => state.playlistResponseSlice.data.message
  );
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
  );
  const offset = searchPrams.get("offset") as string;

  return (
    <section className="mx-auto flex w-[90%] flex-col justify-center items-center ">
      <h1 className=" text-lg font-[600] texy-center mt-2">
        {playlistMessage}
      </h1>
      <aside className="flex justify-between items-center w-full">
        <div className="ms-[50%] -translate-x-[50%]">
          {playlistData.total > 10 && (
            <NormalPlaylistPagenationButtons offset={offset} />
          )}
        </div>
        <p>
          {Number(offset) + defaultOffset < Number(playlistData.total)
            ? Number(offset) + defaultOffset
            : playlistData.total}
          /{playlistData.total}
        </p>
      </aside>
    </section>
  );
};

export default PlaylistHeader;
