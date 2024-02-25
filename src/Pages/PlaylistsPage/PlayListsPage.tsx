import { ActionFunction, ActionFunctionArgs } from "react-router-dom";
import { myToken } from "../../utllties/tokenAndDurationControl";
import CreateNewPaylistForm from "./components/mainPlaylistPageComponents/CreateNewPaylistForm";

const PlayListsPage = () => {
  return <CreateNewPaylistForm />;
};

export default PlayListsPage;

// eslint-disable-next-line react-refresh/only-export-components
export const action: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const userID = localStorage.getItem("userID");
  const form = await request.formData();
  const playlistName = form.get("playlistName");
  const playlistDes = form.get("playlistDes");
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const playlistBody = {
    name: playlistName,
    description: playlistDes,
    public: false,
  };
  console.log(playlistName);
  console.log(playlistDes);
  console.log(userID);
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
  const resolved = response.json();
  console.log(resolved);
  return resolved;
};
