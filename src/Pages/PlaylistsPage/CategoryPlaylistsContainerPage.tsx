import { useAppDispatch, useAppSelector } from "../../stateRoot/reduxHooks";
import { exitAction } from "../../stateRoot/exitSlice";
import { Await, useNavigate, useRouteLoaderData } from "react-router";
import { Suspense, useEffect, useState } from "react";
import LoadingIndecator from "../../components/LoadingIndecator";
import PlaylistItems from "../../components/Playlist/PlaylistItems";
import NormalPlaylistPagenationButtons from "../../components/Playlist/NormalPlaylistPagenationButtons";
import { useSearchParams } from "react-router-dom";
import ErrorFallback from "../../components/Error/ErrorFallback";
import playlistData from "./types/Types";
import { AnimatePresence, motion } from "framer-motion";
import { playlisTracksActions } from "../../stateRoot/playlistTracksSlice";
import PlaylistHeader from "../../components/Playlist/PlaylistHeader";

const CategoryPlaylistsContainerPage = () => {
  const [myOffset, setMyOffset] = useState<string>("10");
  const dispatch = useAppDispatch();
  const { data } = useRouteLoaderData("CPL") as playlistData;
  const [searchPrams] = useSearchParams();
  const offset = searchPrams.get("offset") as string;
  const navigate = useNavigate();
  const exit = useAppSelector((state) => state.exitSlice.exiting);
  const playlistData = useAppSelector(
    (state) => state.playlistResponseSlice.data.playlist
  );

  function backToCateg(): void {
    dispatch(exitAction.setExit());
    setTimeout(() => {
      navigate("/categories");
    }, 300);
  }
  useEffect(() => {
    setMyOffset(offset);
    dispatch(playlisTracksActions.reset());
  }, [offset, dispatch]);

  return (
    <AnimatePresence>
      {!exit && (
        <Suspense fallback={<LoadingIndecator />}>
          <Await resolve={data}>
            {(resolved) => {
              if (resolved.error) {
                return <ErrorFallback ErrorData={resolved.error} />;
              }
              return (
                <motion.main
                  className="min-h-[50vh]"
                  variants={{
                    hidden: { opacity: 0 },
                  }}
                  exit="hidden">
                  <PlaylistHeader />
                  <PlaylistItems key={myOffset} />
                  {playlistData.total > 10 && (
                    <NormalPlaylistPagenationButtons offset={offset} />
                  )}
                  <p
                    onClick={backToCateg}
                    className="text-sm text-center block mt-2 cursor-pointer">
                    Back To Categories
                  </p>
                </motion.main>
              );
            }}
          </Await>
        </Suspense>
      )}
    </AnimatePresence>
  );
};

export default CategoryPlaylistsContainerPage;
