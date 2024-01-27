import { clientID, client_secret } from "./apiCredintials.tsx";
export default async function getNonUserToken() {
  const respone: Response = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${client_secret}`,
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );

  if (!respone.ok) {
    throw new Error("getting token failed");
  }
  const data = respone.json();
  return data;
}
