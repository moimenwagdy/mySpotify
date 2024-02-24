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
import { useAppSelector } from "../../../stateRoot/reduxHooks";
import { queryClient } from "../../../utllties/queryClient";
import { FetchError } from "../../../utllties/interfaces";
import { motion } from "framer-motion";
import TrackItem from "./TrackItem";
import PlaylistTracksNavigationButtons from "./PlaylistTracksNavigationButtons";
import PlaylistTracksImagedetails from "./PlaylistTracksImagedetails";

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
  const offset = useAppSelector((state) => state.playlistTracksSlice.offset);
  console.log(offset);
  const {
    data: tracksData,
    error: tracksError,
    isError,
    isLoading,
    isFetched,
  }: UseQueryResult<tracks, FetchError> = useQuery({
    queryKey: [offset],
    queryFn: () => getTracks(playlisID!, offset),
    enabled: queryClient.getQueryData([offset]) !== offset,
  });


  let content = (
    <>
      {isFetched &&
        tracksData!.items.map((track) => {
          return <TrackItem track={track.track} key={track.track.id} />;
        })}
    </>
  );
  if (isError) {
    console.log(tracksError.message);

    content = <ErrorFallback ErrorData={tracksError.data} />;
  }
  if (isLoading) {
    content = <LoadingIndecator />;
  }

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
              className="w-full min-h-[800px] bg-lightGreen rounded-xl mt-2">
              <div className="w-[96%] mx-auto flex flex-col md:flex-row gap-x-2 ">
                <PlaylistTracksImagedetails
                  total={data.tracks.total}
                  image={data.images[0].url}
                  followers={data.followers.total}
                />
                <div  key={offset} className="bg-dark/90 p-2 rounded-xl me-2 mt-6 w-full md:w-3/5  flex flex-col justify-around  items-center mx-auto">
                  <PlaylistTracksNavigationButtons
                    isLoading={isLoading}
                    data={data.tracks}
                    tracksData={tracksData!}
                  />
                  {content}
                </div>
              </div>
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
