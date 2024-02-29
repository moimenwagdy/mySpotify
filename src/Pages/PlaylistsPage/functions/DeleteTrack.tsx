import { myToken } from "../../../utllties/tokenAndDurationControl";
export const deleteTrack = async (plId: string, uriPayload: string) => {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${plId}/tracks`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tracks: [{ uri: uriPayload }],
        // snapshot_id: "",
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const resolved = await response.json();
  return resolved;
};
