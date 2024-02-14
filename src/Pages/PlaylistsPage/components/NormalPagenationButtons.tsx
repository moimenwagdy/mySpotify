import React from "react";
import { Link, useParams } from "react-router-dom";
import playlistType from "../Types";
import { useAppSelector } from "../../../stateRoot/reduxHooks";

const NormalPagenationButtons: React.FC<{
  offset: string;
  playlist: playlistType;
}> = ({ offset, playlist }) => {
  const params = useParams();
  const id = params.id;
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
  );
  return (
    <aside className="lg:hidden flex justify-center gap-x-10 ">
      <Link
        to={`/playlists/${id}/?limit=${defaultOffset}&offset=${
          Number(offset) - defaultOffset
        }`}>
        <button disabled={playlist.playlists.previous === null}>
          previous
        </button>
      </Link>
      <Link
        to={`/playlists/${id}/?limit=${defaultOffset}&offset=${
          Number(offset) + defaultOffset
        }`}>
        <button disabled={playlist.playlists.next === null}>next</button>
      </Link>
    </aside>
  );
};

export default NormalPagenationButtons;
