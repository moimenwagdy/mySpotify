import { LoaderFunction } from "react-router";
import Home from "../components/Home";
import { LoaderRequest } from "../utllties/interfaces";
import getNonUserToken from "../utllties/getNonUserToken";
import setFutureDate from "../utllties/tokenAndDurationControl";

const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async function ({
  request,
}: LoaderRequest) {
  const Hashparams = new URLSearchParams(window.location.hash.substring(1));
  const token: string | null = Hashparams.get("access_token");
  const tokenExpire: string | null = Hashparams.get("expires_in");
  const tokenIsSaved: string | null = localStorage.getItem("userToken");
  if (!tokenIsSaved && token && tokenExpire) {
    localStorage.clear();
    localStorage.setItem("userToken", token);
    setFutureDate();
  }
  if (!tokenIsSaved && !token) {
    const searchParams = new URL(request.url).searchParams;
    const error: string | null = searchParams.get("error");
    if (error === "access_denied") {
      const data = await getNonUserToken();
      const token: string = data["access_token"];
      localStorage.setItem("nonUserToken", token);
      setFutureDate();
    }
    return error;
  }
  return token;
};
