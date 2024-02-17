import {
  Await,
  LoaderFunction,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
  useParams,
} from "react-router";
import DialogModal from "../../../components/DialogModal";
import { myToken } from "../../../utllties/setFutureDate";
import { Suspense } from "react";
import LoadingIndecator from "../../../components/LoadingIndecator";
import { playlistDetails } from "../Types";
import ErrorFallback from "../../../components/ErrorFallback";
import { useAppSelector } from "../../../stateRoot/reduxHooks";

const PlaylistDetails = () => {
  const { playlistDetails } = useLoaderData() as playlistDetails;
  const params = useParams();
  const PreviousUrlId = params.id;
  const offset = localStorage.getItem("offset");
  const limit = localStorage.getItem("limit");
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
  );
  return (
    <Suspense fallback={<LoadingIndecator />}>
      <Await resolve={playlistDetails}>
        {(data) => {
          if (data.error) {
            return <ErrorFallback ErrorData={data} />;
          }
          console.log(data);
          return (
            <DialogModal
              key={data.id}
              path={`/playlists/${PreviousUrlId}?offset=${
                offset ? offset : 0
              }&limit=${limit ? limit : defaultOffset}`}>
              <p className="bg-red-600 ">{data.id}</p>
            </DialogModal>
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
