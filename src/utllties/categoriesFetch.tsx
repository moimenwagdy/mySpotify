import { myToken } from "./setFutureDate";
import { FetchError } from "./interfaces";

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

export default categoriesFetch;
