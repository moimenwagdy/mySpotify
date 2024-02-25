import { ActionFunction, ActionFunctionArgs } from "react-router-dom";
import { myToken } from "../../utllties/tokenAndDurationControl";
import UserPlaylistContainer from "./components/mainPlaylistPageComponents/UserPlaylistContainer";
import { playlistItem } from "./types/Types";
import { errorContent } from "../../utllties/interfaces";

const PlayListsPage = () => {
  return <UserPlaylistContainer />;
};

export default PlayListsPage;

// eslint-disable-next-line react-refresh/only-export-components
export const action: ActionFunction<playlistItem | errorContent> = async ({
  request,
}: ActionFunctionArgs) => {
  const userID = localStorage.getItem("userID");
  const form = await request.formData();
  const playlistName = form.get("playlistName");
  const playlistDes = form.get("playlistDes");
  const publicValue = form.get("public");
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const playlistBody = {
    name: playlistName,
    description: playlistDes,
    public: publicValue,
  };
  console.log(publicValue);
  const response = await fetch(
    `https://api.spotify.com/v1/users/${userID}/playlists`,
    {
      method: request.method,
      body: JSON.stringify(playlistBody),
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    return error.error;
  }
  const resolved = await response.json();
  console.log(resolved);
  form.set("playlistName", "");
  form.set("playlistDes", "");
  return resolved;
};
