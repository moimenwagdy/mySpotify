import {
  Await,
  LoaderFunction,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
  useNavigate,
} from "react-router";
import { myToken } from "../../utllties/tokenAndDurationControl";
import { Suspense, useEffect } from "react";
import LoadingIndecator from "../../components/LoadingIndecator";
import { playlistDetails, tracks } from "./types/Types";
import ErrorFallback from "../../components/Error/ErrorFallback";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { getTracks } from "./functions/getTracks";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../stateRoot/reduxHooks";
import { queryClient } from "../../utllties/queryClient";
import { errorContent } from "../../components/Error/types/Types";
import { motion } from "framer-motion";
import TrackItem from "../../components/TrackItem/TrackItem";
import PlaylistTracksNavigationButtons from "../../components/TrackItem/PlaylistTracksNavigationButtons";
import PlaylistTracksImagedetails from "./components/playlistDetailsAndTracksComponents/PlaylistTracksImagedetails";
import { exitAction } from "../../stateRoot/exitSlice";
import PlaylistCleared from "./components/playlistDetailsAndTracksComponents/PlaylistCleared";

const PlaylistDetails_TracksItemsPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { playlistDetails }: playlistDetails =
    useLoaderData() as playlistDetails;
  useEffect(() => {
    dispatch(exitAction.notExit());
  });

  const [params] = useSearchParams();
  const playlisID = params.get("pListId");
  const offset = useAppSelector((state) => state.playlistTracksSlice.offset);

  const {
    data: tracksData,
    error: tracksError,
    isError,
    isLoading,
    isFetched,
  }: UseQueryResult<tracks, errorContent> = useQuery({
    queryKey: ["plTracks", offset],
    queryFn: () => getTracks(playlisID!, offset),
    enabled: queryClient.getQueryData([offset]) !== offset,
  });
  const TracksDataExist = tracksData?.total !== 0;
  useEffect(() => {
    if (isFetched && !TracksDataExist) {
      const time = setTimeout(() => {
        navigate("/playlists");
      }, 1000);

      return () => {
        clearTimeout(time);
      };
    }
    localStorage.setItem("pListId", playlisID!);
  });

  let content = (
    <>
      {isFetched &&
        !isError &&
        tracksData &&
        tracksData!.items.map((track) => {
          return <TrackItem track={track.track} key={track.track.id} />;
        })}
    </>
  );

  if (isFetched && !TracksDataExist) {
    content = <PlaylistCleared />;
  }

  if (isLoading) {
    content = <LoadingIndecator />;
  }

  return (
    <Suspense fallback={<LoadingIndecator />}>
      <Await resolve={playlistDetails}>
        {(data) => {
          if (data.error) {
            return <ErrorFallback ErrorData={data.error} />;
          }
          if (isError) {
            return <ErrorFallback ErrorData={tracksError} />;
          }
          return (
            <motion.div
              variants={{
                hidden: { opacity: 0, y: -30 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              className="w-full pb-6 bg-lightGreen dark:bg-dark/20 rounded-xl mt-2">
              <div className="mx-auto flex flex-col md:flex-row gap-x-2 ">
                <PlaylistTracksImagedetails
                  total={data.tracks.total}
                  image={data.images && data.images[0].url}
                  followers={data.followers.total}
                />
                <div
                  key={offset}
                  className={`bg-dark/90 p-4 rounded-xl  mt-6 w-full md:w-4/6  flex flex-col  justify-start  items-center mx-auto`}>
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

export default PlaylistDetails_TracksItemsPage;

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

  const resolved = await response.json();
  return resolved;
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  return defer({ playlistDetails: getDetails({ params, request }) });
};
