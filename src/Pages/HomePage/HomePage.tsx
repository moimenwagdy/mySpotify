import { LoaderFunction } from "react-router";
import getNonUserToken from "./functions.tsx/getNonUserToken";
import setFutureDate from "../../utllties/tokenAndDurationControl";
import Home from "./HomePageComponents/Home";

const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async function () {
  const Hashparams = new URLSearchParams(window.location.hash.substring(1));
  const token: string | null = Hashparams.get("access_token");
  const tokenExpire: string | null = Hashparams.get("expires_in");
  const tokenIsSaved: string | null = localStorage.getItem("userToken");
  const nonUsertokenIsSaved: string | null =
    localStorage.getItem("nonUserToken");
  //output the token from the redirected url if authentication succssed 
  if (!tokenIsSaved && token && tokenExpire) {
    localStorage.removeItem("userToken");
    localStorage.removeItem("nonUserToken");
    localStorage.removeItem("tokenExpire");
    localStorage.removeItem("pListId");
    localStorage.removeItem("playlistIdFromCategories");
    localStorage.setItem("userToken", token);
    setFutureDate();
  }
  //run the main dev get token function if failed authentication
  if (!tokenIsSaved && !token && !nonUsertokenIsSaved) {
    const data = await getNonUserToken();
    const token: string = data["access_token"];
    localStorage.setItem("nonUserToken", token);
    setFutureDate();
    // }
    return data;
  }
  return token;
};
