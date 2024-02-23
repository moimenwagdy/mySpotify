import { FetchError } from "../../utllties/interfaces";
import { myToken } from "../../utllties/setFutureDate";

export const getTracks = async function (playlistID: string, offset: number) {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistID}/tracks?offset=${offset}&limit=7`,
    {
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
      },
    }
  );
  if (response.status === 404) {
    const res = new FetchError({ message: "Page Not Found", status: 404 });
    throw res;
  }

  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    const res = new FetchError(error.error);
    throw res;
  }

  const jsonRespnse = response.json();
  return jsonRespnse;
};
