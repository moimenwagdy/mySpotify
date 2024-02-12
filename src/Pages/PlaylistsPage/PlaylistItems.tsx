import PlaylistItem from "./PlaylistItem";
import { useAppDispatch } from "../../stateRoot/reduxHooks";
import { exitAction } from "../../stateRoot/exitSlice";
import { Await, useLoaderData } from "react-router";
import playlistType from "./Types";
import { Suspense, useEffect, useState } from "react";
import playlistsResponseSlice from "../../stateRoot/playlistsResponseSlice";
import LoadingIndecator from "../../components/LoadingIndecator";
import { useSearchParams } from "react-router-dom";

exitAction;
const PlaylistItems = () => {
  const { playlists } = useLoaderData() as playlistType;
  Promise.resolve(playlists).then((playlists) => {
    dispatch(playlistsResponseSlice.actions.setPlaylistData({ playlists }));
  });
  const [myOffset, setMyOffset] = useState("");
  const dispatch = useAppDispatch();

  function backToCateg(): void {
    dispatch(exitAction.setExit());
  }
  const [searchPrams] = useSearchParams();
  const offset = searchPrams.get("offset") as string;
  useEffect(() => setMyOffset(offset), [offset]);
  return (
    <>
      <Suspense fallback={<LoadingIndecator />}>
        <Await resolve={playlists}>
          {() => {
            return <PlaylistItem key={myOffset} />;
          }}
        </Await>
      </Suspense>
      <a
        onClick={backToCateg}
        className="text-sm text-center block mt-2"
        href="/categories">
        Back To Categories
      </a>
    </>
  );
};

export default PlaylistItems;
