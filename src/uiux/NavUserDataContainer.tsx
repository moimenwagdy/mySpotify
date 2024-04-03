import { motion } from "framer-motion";
import UserDataCard from "./UserDataCard";
import Button from "./Button";
import { useSubmit } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userProfileData } from "../utllties/userProfileData";
import { myToken } from "../utllties/tokenAndDurationControl";
import {
  endPoint,
  clientID,
  redirectURI,
  responseType,
  scope,
} from "../utllties/apiCredintials";
userProfileData;
const NavUserDataContainer = () => {
  const token = myToken();
  const userToken = token?.userToken;
  const nonUserToken = token?.nonUserToken;
  const { data, isFetched } = useQuery({
    queryKey: ["userProfileData"],
    queryFn: () => userProfileData(userToken!),
    enabled: userToken != undefined,
  });
  const submit = useSubmit();
  function logOut() {
    submit(null, { method: "POST", action: "logout" });
  }
  if (isFetched) {
    localStorage.setItem("userID", data && data.id);
  }
  return (
    <section className="flex flex-col items-end -mb-4 mt-6  self-end me-2">
      {data && userToken && !nonUserToken ? (
        <>
          <UserDataCard
            followers={data && data.followers.total}
            userName={data && data["display_name"]}
            userEmail={data && data.email}
            imgSRC={
              data && data.images.length > 0
                ? data.images[0].url
                : "../../images/spoIcon.png"
            }>
            <Button
              onClick={logOut}
              title="Logout"
              className="bg-light text-xs px-1 py-[0!important] text-dark "
            />
          </UserDataCard>
        </>
      ) : (
        <UserDataCard
          followers={0}
          userName="Welcome user"
          userEmail="login to get your data"
          imgSRC="../../images/spoIcon.png">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="self-end -mt-2 "
            href={`${endPoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}`}>
            <Button
              className="bg-dark text-[10px] px-1 text-lightGreen"
              title="Log In"></Button>
          </motion.a>
        </UserDataCard>
      )}
    </section>
  );
};

export default NavUserDataContainer;
