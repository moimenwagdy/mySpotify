import { myToken } from "../../../utllties/tokenAndDurationControl";

const categoriesFetch = async ({
  offset,
  signal,
}: {
  signal?: AbortSignal;
  offset: number;
}) => {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(
    `https://api.spotify.com/v1/browse/categories/?limit=10&offset=${offset}`,
    {
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
      },
      signal,
    }
  );
  if (response.status === 404) {
    throw { message: "Page Not Found", status: 404 };
  }

  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }

  const jsonRespnse = response.json();
  return jsonRespnse;
};

export default categoriesFetch;
