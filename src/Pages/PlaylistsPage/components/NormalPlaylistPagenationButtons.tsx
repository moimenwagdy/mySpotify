import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../../stateRoot/reduxHooks";

const NormalPlaylistPagenationButtons: React.FC<{
  offset: string;
}> = ({ offset }) => {
  const params = useParams();
  const id = params.id;
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
  );
  const data = useAppSelector(
    (state) => state.playlistResponseSlice.data.playlist
  );
  return (
    <aside className="lg:hidden flex justify-center gap-x-10 ">
      <Link
        to={`/playlists/${id}?limit=${defaultOffset}&offset=${
          Number(offset) - defaultOffset
        }`}>
        <button disabled={data.previous === null}>previous</button>
      </Link>
      <Link
        to={`/playlists/${id}?limit=${defaultOffset}&offset=${
          Number(offset) + defaultOffset
        }`}>
        <button disabled={data.next === null}>next</button>
      </Link>
    </aside>
  );
};

export default NormalPlaylistPagenationButtons;
