import { LoaderFunction, useLoaderData } from "react-router";
import Home from "./HomePage/Home";
// import { LoaderRequest } from "../utllties/interfaces";
import getNonUserToken from "../utllties/getNonUserToken";
import setFutureDate from "../utllties/tokenAndDurationControl";

const LandingPage = () => {
  const data = useLoaderData();

  console.log(data);
  return (
    <div>
      <Home />
    </div>
  );
};

export default LandingPage;

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async function () {
  const Hashparams = new URLSearchParams(window.location.hash.substring(1));
  const token: string | null = Hashparams.get("access_token");
  const tokenExpire: string | null = Hashparams.get("expires_in");
  const tokenIsSaved: string | null = localStorage.getItem("userToken");
  const nonUsertokenIsSaved: string | null =
    localStorage.getItem("nonUserToken");
  if (!tokenIsSaved && token && tokenExpire) {
    localStorage.removeItem("userToken");
    localStorage.removeItem("nonUserToken");
    localStorage.removeItem("tokenExpire");
    localStorage.removeItem("pListId");
    localStorage.removeItem("playlistIdFromCategories");
    localStorage.setItem("userToken", token);
    setFutureDate();
  }
  if (!tokenIsSaved && !token && !nonUsertokenIsSaved) {
    const data = await getNonUserToken();
    const token: string = data["access_token"];
    console.log(data);
    localStorage.setItem("nonUserToken", token);
    setFutureDate();
    // }
    return data;
  }
  return token;
};
