import { json } from "react-router";

export const userProfileData = async (token: string) => {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw json({ message: "faild to get profile data" });
  }
  const data = await response.json();
  return data;
};
