import PlaylistItem from "./PlaylistItem";
import { useAppDispatch, useAppSelector } from "../../stateRoot/reduxHooks";
import { exitAction } from "../../stateRoot/exitSlice";
import { Await, useLoaderData, useParams } from "react-router";
import playlistType from "./Types";
import { Suspense } from "react";
import playlistsResponseSlice from "../../stateRoot/playlistsResponseSlice";
import LoadingIndecator from "../../components/LoadingIndecator";
import playlistPages from "../../stateRoot/playlistPages";
import { Link } from "react-router-dom";

exitAction;
const PlaylistItems = () => {
  // const data = useAppSelector((state) => state.playlistResponseSlice);

  const pagesData = useAppSelector((state) => state.playlistPages);
  const param = useParams();
  const id = param.id;
  const dispatch = useAppDispatch();

  const { playlists } = useLoaderData() as playlistType;

  function backToCateg(): void {
    dispatch(exitAction.setExit());
  }

  Promise.resolve(playlists).then((playlists) => {
    dispatch(playlistsResponseSlice.actions.setPlaylistData({ playlists }));
  });

  function nextPlayLists() {
    dispatch(playlistPages.actions.nextPage());
  }
  function prvPlaylist() {
    dispatch(playlistPages.actions.prevPage());
  }

  return (
    <>
      <Suspense fallback={<LoadingIndecator />}>
        <Await resolve={playlists}>
          {() => {
            return <PlaylistItem />;
          }}
        </Await>
      </Suspense>
      <a
        onClick={backToCateg}
        className="text-sm text-center block mt-2"
        href="/categories">
        Back To Categories
      </a>
      <div className="flex justify-center gap-x-10">
        <Link
          to={`/playlists/${id}/?limit=10&offset=${10 || pagesData.offset}`}
          onClick={prvPlaylist}>
          previous
        </Link>
        <Link
          to={`/playlists/${id}/?limit=10&offset=${pagesData.offset}`}
          onClick={nextPlayLists}>
          next
        </Link>
      </div>
    </>
  );
};

export default PlaylistItems;
