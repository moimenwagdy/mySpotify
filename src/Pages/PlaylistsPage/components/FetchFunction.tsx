import { myToken } from "../../../utllties/tokenAndDurationControl";

export const fetchDetails = async (id: string) => {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(`https://api.spotify.com/v1/playlists/${id}`, {
    headers: {
      Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
    },
  });
  const resolved = await response.json();
  return resolved;
};
