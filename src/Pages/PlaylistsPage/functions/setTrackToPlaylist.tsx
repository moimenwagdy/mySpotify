import { myToken } from "../../../utllties/tokenAndDurationControl";

export const setTrackToPlaylist = async (
  playlistID: string,
  uriPayload: string
) => {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  console.log(playlistID);
  console.log(uriPayload);
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [uriPayload], position: 0 }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const resolved = await response.json();
  return resolved;
};
