import { useAppDispatch, useAppSelector } from "../../stateRoot/reduxHooks";
import { exitAction } from "../../stateRoot/exitSlice";
import { Await, useLoaderData } from "react-router";
import playlistType from "./Types";
import { Suspense, useEffect, useState } from "react";
import playlistsResponseSlice from "../../stateRoot/playlistsResponseSlice";
import LoadingIndecator from "../../components/LoadingIndecator";
import PlaylistItems from "./components/PlaylistItems";
import NormalPagenationButtons from "./components/NormalPagenationButtons";
import { useSearchParams } from "react-router-dom";
const CategoriesPlaylistContainer = () => {
  const [myOffset, setMyOffset] = useState("10");
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.playlistResponseSlice);
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
  );
  const { playlists } = useLoaderData() as playlistType;

  Promise.resolve(playlists).then((playlists) => {
    dispatch(playlistsResponseSlice.actions.setPlaylistData({ playlists }));
  });
  function backToCateg(): void {
    dispatch(exitAction.setExit());
  }
  const [searchPrams] = useSearchParams();
  const offset = searchPrams.get("offset") as string;
  useEffect(() => setMyOffset(offset), [offset]);
  return (
    <Suspense fallback={<LoadingIndecator />}>
      <Await resolve={playlists}>
        {(resolved) => {
          console.log(resolved);
          return (
            <main>
              <section className=" - mx-auto flex w-[90%] flex-col justify-center items-center">
                <h1 className=" text-lg font-[600] texy-center mt-4">
                  {data.message}
                </h1>
                <aside className="flex justify-between items-center w-full">
                  <div className="ms-[50%] -translate-x-[50%]">
                    {Number(data.playlists.total) > 10 && (
                      <NormalPagenationButtons
                        playlist={resolved}
                        offset={offset}
                      />
                    )}
                  </div>
                  <p className="">
                    {Number(offset) + defaultOffset <
                    Number(data.playlists.total)
                      ? Number(offset) + defaultOffset
                      : data.playlists.total}
                    /{data.playlists.total}
                  </p>
                </aside>
              </section>
              <PlaylistItems key={myOffset} />
              {Number(data.playlists.total) > 10 && (
                <NormalPagenationButtons playlist={resolved} offset={offset} />
              )}
              <a
                onClick={backToCateg}
                className="text-sm text-center block mt-2"
                href="/categories">
                Back To Categories
              </a>
            </main>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default CategoriesPlaylistContainer;
