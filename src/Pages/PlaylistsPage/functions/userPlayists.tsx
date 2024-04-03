import { myToken } from "../../../utllties/tokenAndDurationControl";

export const getUserPlaylists = async () => {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  if (userToken) {
    const response = await fetch("https://api.spotify.com/v1/me/playlists", {
      headers: {
        Authorization: "Bearer " + userToken,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      console.log(error);
      throw error.error;
    }
    const myData = await response.json();
    return myData;
  }
};
