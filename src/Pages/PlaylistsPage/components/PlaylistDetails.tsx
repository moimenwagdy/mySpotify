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

  console.log(tracksData?.items[0].track.name);

  return (
    <Suspense fallback={<LoadingIndecator />}>
      <Await resolve={playlistDetails}>
        {(data) => {
          if (data.error) {
            return <ErrorFallback ErrorData={data} />;
          }
          return (
            <div className="w-full bg-lightGreen/70 min-h-[650px]">
              <div className="flex flex-col md:flex-row">
                <div className="mt-4 md:mt-0 w-2/5 mx-auto lg:mx-0 flex flex-col gap-y-2 justify-center items-center md:min-h-[650px]">
                  {/* // path={`/playlists/${PreviousUrlId}?offset=${
                    //   offset ? offset : 0
                    // }&limit=${limit ? limit : defaultOffset}`}
                  // style={`background-image: url()`} */}
                  <div className="">
                    <p className="text-xs  text-center text-white">
                      Followers {data.followers.total}
                    </p>
                    <p className="text-xs  text-center text-white">
                      {data.tracks.total} Tracks
                    </p>
                  </div>
                  <img
                    src={`${data.images[0].url}`}
                    alt="PlayListIcon"
                    className="rounded-md"></img>
                </div>
                <div className="mt-6 w-full md:w-3/5 gap-y-2 flex flex-col justify-center items mx-auto">
                  {tracksData ? (
                    tracksData.items.map((track) => {
                      return (
                        <iframe
                          key={track.track.id}
                          className="w-[95%] md:w-[80%] mx-auto"
                          src={`https://open.spotify.com/embed/track/${track.track.id}?utm_source=generator`}
                          height="80"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"></iframe>
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
            </div>
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
