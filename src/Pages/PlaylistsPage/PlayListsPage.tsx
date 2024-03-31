import {
  ActionFunction,
  ActionFunctionArgs,
  useActionData,
} from "react-router-dom";
import { myToken } from "../../utllties/tokenAndDurationControl";
import UserPlaylistContainer from "./components/mainPlaylistPageComponents/UserPlaylistContainer";
import { playlistItem } from "./types/Types";
import { errorContent } from "../../utllties/interfaces";
import createNewPlaylist from "./functions/createNewPlaylist";
import { useAppDispatch } from "../../stateRoot/reduxHooks";
import { nonUserPlaylistsActions } from "../../stateRoot/nonUserPLaylists";
import { useEffect } from "react";

const PlayListsPage = () => {
  const data = useActionData();
  const dispatch = useAppDispatch();
  const tokens = myToken();
  const nonUserToken = tokens?.nonUserToken;
  useEffect(() => {
    if (nonUserToken && data) {
      
      dispatch(nonUserPlaylistsActions.addNewNonUserPlaylist(data));
    }
  }, [data, dispatch, nonUserToken]);

  console.log(data);

  return <UserPlaylistContainer />;
};

export default PlayListsPage;

// eslint-disable-next-line react-refresh/only-export-components
export const action: ActionFunction<playlistItem | errorContent> = async ({
  request,
}: ActionFunctionArgs) => {
  const userID = localStorage.getItem("userID");
  const form = await request.formData();
  const playlistName = form.get("playlistName")!;
  const playlistDes = form.get("playlistDes")!;
  const publicValue = form.get("public")!;
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const playlistBody = {
    name: playlistName,
    description: playlistDes,
    public: publicValue,
  };
  if (userToken) {
    return createNewPlaylist(userID!, request.method, playlistBody);
  }
  if (nonUserToken) {
    const randomID = Math.random().toString(36).slice(2, 10);
    const newPlaylistBody = { ...playlistBody, id: randomID, uris: [] };
    return newPlaylistBody;
  }
};