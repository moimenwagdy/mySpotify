import { motion } from "framer-motion";
import UserDataCard from "./UserDataCard";
import Button from "./Button";
import { useSubmit } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { userProfileData } from "../utllties/userProfileData";
import { useToken } from "../utllties/setFutureDate";
import {
  endPoint,
  clientID,
  redirectURI,
  responseType,
} from "../utllties/apiCredintials";
userProfileData;
const NavUserDataContainer = () => {
  const token = useToken();
  const userToken = token?.userToken;
  const { data } = useQuery({
    queryKey: ["userProfileData"],
    queryFn: () => userProfileData(userToken!),
    enabled: userToken != undefined,
  });
  const submit = useSubmit();
  function logOut() {
    submit(null, { method: "POST", action: "logout" });
  }
  console.log(data);
  return (
    <motion.main className="flex flex-col items-end -mt-10 self-end me-2">
      {data ? (
        <>
          <UserDataCard
            followers={data && data.followers.total}
            userName={data && data["display_name"]}
            userEmail="moimenwy@gmail.com"
            imgSRC={data && data.images.length > 0 ? data.images[0].url:"../../images/spoIcon.png"}>
            <Button
              onClick={logOut}
              title="Logout"
              className="bg-light text-[10px] px-1 text-dark "
            />
          </UserDataCard>
        </>
      ) : (
        <UserDataCard
          followers={12}
          userName="Welcome user"
          userEmail="login to get you playlists"
          imgSRC="../../images/spoIcon.png">
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="self-end -mt-2 "
            href={`${endPoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`}>
            <Button
              className="bg-dark text-[10px] px-1 text-lightGreen"
              title="Log In"></Button>
          </motion.a>
        </UserDataCard>
      )}
    </motion.main>
  );
};

export default NavUserDataContainer;
