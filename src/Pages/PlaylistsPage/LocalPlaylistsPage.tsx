import { LoaderFunction, useLoaderData, useNavigate } from "react-router";
import { myToken } from "../../utllties/tokenAndDurationControl";
import { localTracks } from "./types/Types";
import TrackItem from "../../components/TrackItem/TrackItem";

export const LocalPlaylists = () => {
  const data: localTracks = useLoaderData() as localTracks;
  const dataExist = data?.tracks?.length !== 0;
  const navigate = useNavigate();
  if (data === null) {
    setTimeout(() => {
      navigate("/playlists");
    }, 2000);
  }
  return (
    <div className="dark:bg-dark/40 bg-secondryColor p-10">
      <div className="w-full md:w-[80%] bg-lightGreen/80 dark:bg-darkerGreen p-5 rounded-lg lg:w-[70%] mx-auto  min-h-screen">
        {dataExist &&
          data &&
          data?.tracks?.map((item) => {
            return <TrackItem key={item.id} track={item} />;
          })}
        {data === null && (
          <div className="mt-10 text-white text-center">
            <p> playlist Cleared </p>
            returning to your playlists in 3 seconds
          </div>
        )}
      </div>
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const localPlaylistsLoader: LoaderFunction = async ({ request }) => {
  const token = myToken();
  const userToken = token?.userToken;
  const nonUserToken = token?.nonUserToken;
  const searchParams = new URL(request.url).searchParams;
  const tracksIds = searchParams.get("pListId");

  if (tracksIds === "empty") {
    return null;
  } else {
    const response = await fetch(
      `https://api.spotify.com/v1/tracks?ids=${tracksIds!}`,
      {
        headers: {
          Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw error.error;
    }
    const resolved = await response.json();
    return resolved;
  }
};
