import { myToken } from "../../../utllties/tokenAndDurationControl";

export default async function createNewPlaylist(
  userID: string,
  method: string,
  playlistBody: {
    name: FormDataEntryValue;
    description: FormDataEntryValue;
    public: FormDataEntryValue;
  }
) {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;

  const response = await fetch(
    `https://api.spotify.com/v1/users/${userID}/playlists`,
    {
      method: method,
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
  return resolved;
}
