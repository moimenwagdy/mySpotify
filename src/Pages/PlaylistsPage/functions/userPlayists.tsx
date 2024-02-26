import { myToken } from "../../../utllties/tokenAndDurationControl";

export const getUserPlaylists = async () => {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const myData = await response.json();
  return myData;
};
