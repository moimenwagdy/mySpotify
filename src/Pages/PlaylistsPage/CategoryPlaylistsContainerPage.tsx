import { useAppDispatch, useAppSelector } from "../../stateRoot/reduxHooks";
import { exitAction } from "../../stateRoot/exitSlice";
import { Await, useNavigate, useRouteLoaderData } from "react-router";
import { Suspense, useEffect, useState } from "react";
import LoadingIndecator from "../../components/LoadingIndecator";
import PlaylistItems from "./components/category'sPlaylistsComponents/PlaylistItems";
import NormalPlaylistPagenationButtons from "./components/category'sPlaylistsComponents/NormalPlaylistPagenationButtons";
import { useSearchParams } from "react-router-dom";
import ErrorFallback from "../../components/ErrorFallback";
import playlistData from "./types/Types";
import { AnimatePresence, motion } from "framer-motion";
import { playlisTracksActions } from "../../stateRoot/playlistTracksSlice";

const CategoryPlaylistsContainerPage = () => {
  const [myOffset, setMyOffset] = useState<string>("10");
  const dispatch = useAppDispatch();
  const { data } = useRouteLoaderData("CPL") as playlistData;
  const [searchPrams] = useSearchParams();
  const offset = searchPrams.get("offset") as string;
  const navigate = useNavigate();
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
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
  const exit = useAppSelector((state) => state.exitSlice.exiting);
  console.log(exit);
  const playlistData = useAppSelector(
    (state) => state.playlistResponseSlice.data.playlist
  );
  const playlistMessage = useAppSelector(
    (state) => state.playlistResponseSlice.data.message
  );
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
                  variants={{
                    hidden: { opacity: 0 },
                  }}
                  exit="hidden">
                  <section className="mx-auto flex w-[90%] flex-col justify-center items-center">
                    <h1 className=" text-lg font-[600] texy-center mt-2">
                      {playlistMessage}
                    </h1>
                    <aside className="flex justify-between items-center w-full">
                      <div className="ms-[50%] -translate-x-[50%]">
                        {Number(playlistData.total) > 10 && (
                          <NormalPlaylistPagenationButtons offset={offset} />
                        )}
                      </div>
                      <p className="">
                        {Number(offset) + defaultOffset <
                        Number(playlistData.total)
                          ? Number(offset) + defaultOffset
                          : playlistData.total}
                        /{playlistData.total}
                      </p>
                    </aside>
                  </section>
                  <PlaylistItems key={myOffset} />
                  {Number(playlistData.total) > 10 && (
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
