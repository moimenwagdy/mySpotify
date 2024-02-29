import { myToken } from "../../../utllties/tokenAndDurationControl";

export const checkSavedTrack = async function (href: string) {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(`${href}`, {
    headers: {
      Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
    },
  });
  if (response.status === 404) {
    throw { message: "Page Not Found", status: 404 };
  }

  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }

  const jsonRespnse = await response.json();
  return jsonRespnse;
};
