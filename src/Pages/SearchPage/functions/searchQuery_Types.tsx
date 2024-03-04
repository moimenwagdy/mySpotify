import { myToken } from "../../../utllties/tokenAndDurationControl";

export const searchQuery_Types = async (targetvalue: string, types: string) => {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${targetvalue}&type=${types}&limit=2&offset=0`,
    {
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    return error;
  }
  const resolved = await response.json();
  return resolved;
};
