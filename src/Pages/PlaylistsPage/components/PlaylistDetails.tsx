import {
  Await,
  LoaderFunction,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from "react-router";
import { myToken } from "../../../utllties/setFutureDate";
import { Suspense } from "react";
import LoadingIndecator from "../../../components/LoadingIndecator";
import { playlistDetails, tracks } from "../Types";
import ErrorFallback from "../../../components/ErrorFallback";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getTracks } from "../getTracks";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../stateRoot/reduxHooks";
import { playlisTracksActions } from "../../../stateRoot/playlistTracksSlice";
import { queryClient } from "../../../utllties/queryClient";
import { FetchError } from "../../../utllties/interfaces";
import { motion } from "framer-motion";

const PlaylistDetails = () => {
  const { playlistDetails }: playlistDetails =
    useLoaderData() as playlistDetails;
  // const params = useParams();
  // const PreviousUrlId = params.id;
  // const offset = localStorage.getItem("offset");
  // const limit = localStorage.getItem("limit");
  // const defaultOffset = useAppSelector(
  // (state) => state.playlistPages.offsetDefaultVal
  // );
  const [params] = useSearchParams();
  const playlisID = params.get("pListId");
  const dispatch = useAppDispatch();
  const offset = useAppSelector((state) => state.playlistTracksSlice.offset);
  console.log(offset);
  const { data: tracksData }: UseQueryResult<tracks, FetchError> = useQuery({
    queryKey: [offset],
    queryFn: () => getTracks(playlisID!, offset),
    enabled: queryClient.getQueryData([offset]) !== offset,
  });

  console.log(tracksData?.items[0].track.artists[0].name);

  return (
    <Suspense fallback={<LoadingIndecator />}>
      <Await resolve={playlistDetails}>
        {(data) => {
          if (data.error) {
            return <ErrorFallback ErrorData={data} />;
          }
          return (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -30 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              className="w-full min-h-[650px] bg-lightGreen rounded-xl mt-2">
              <div className="w-[96%] mx-auto flex flex-col md:flex-row gap-x-2 ">
                <div className=" md:bg-secondryColor/50  rounded-xl mt-4 md:mt-6 w-2/5 mx-auto lg:mx-0 flex flex-col-reverse gap-y-2 justify-center items-center md:min-h-[650px]">
                  {/* // path={`/playlists/${PreviousUrlId}?offset=${
                    //   offset ? offset : 0
                    // }&limit=${limit ? limit : defaultOffset}`}
                  // style={`background-image: url()`} */}
                  <div className="bg-dark px-6 py-1 rounded-md">
                    <p className="text-sm  text-center text-lightGreen ">
                      Followers {data.followers.total}
                    </p>
                    <p className="text-sm  text-center text-lightGreen ">
                      {data.tracks.total} Tracks
                    </p>
                  </div>
                  <img
                    src={`${data.images[0].url}`}
                    alt="PlayListIcon"
                    className="rounded-md w-[400px]"></img>
                </div>
                <div className="bg-dark p-2 rounded-xl me-2 mt-6 w-full md:w-3/5  flex flex-col justify-around  items-center mx-auto">
                  {tracksData ? (
                    tracksData.items.map((track) => {
                      return (
                        <>
                          <iframe
                            key={track.track.id}
                            className="w-full  mx-auto rounded-xl"
                            src={`https://open.spotify.com/embed/track/${track.track.id}?utm_source=generator`}
                            height="80"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"></iframe>
                          <nav className="flex justify-between text-sm items-center w-[90%] gap-x-3">
                            <p className="text-lightGreen  rounded-md my-1 bg-dark px-2">
                              By - {track.track.artists[0].name}
                            </p>
                            <div className="flex text-lightGreen gap-x-1 ">
                              <button className="bg-dark px-2 rounded-md">
                                Albums
                              </button>
                              <button className="bg-dark px-2 rounded-md">
                                Details
                              </button>
                            </div>
                          </nav>
                        </>
                      );
                    })
                  ) : (
                    <LoadingIndecator />
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  dispatch(playlisTracksActions.increase());
                }}>
                increase
              </button>
              <button
                onClick={() => {
                  dispatch(playlisTracksActions.decrease());
                }}>
                decrease
              </button>
            </motion.div>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default PlaylistDetails;

// eslint-disable-next-line react-refresh/only-export-components
export const getDetails: LoaderFunction = async ({
  request,
}: LoaderFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const pListId = searchParams.get("pListId");
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${pListId}`,
    {
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
      },
    }
  );

  const resolved = response.json();
  return resolved;
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  return defer({ playlistDetails: getDetails({ params, request }) });
};
