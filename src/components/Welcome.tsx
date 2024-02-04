import Button from "../uiux/Button";
import {
  endPoint,
  clientID,
  redirectURI,
  responseType,
  scope,
  redirectURI2,
} from "../utllties/apiCredintials";
import { myToken } from "../utllties/setFutureDate";
import { motion } from "framer-motion";
const Welcome = () => {
  const token = myToken();
  console.log(token);
  return (
    <main className="h-[100vh]">
      <section className="flex justify-center items-center  bg-smImg  sm:bg-mdImg md:bg-lgImg min-h-full bg-cover absolute top-0 right-0 left-0 z-[0]  ">
        <div className="h-[150px] flex justify-start items-center gap-y-6 flex-col">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center text-3xl  tracking-widest">
            Raise The Beat Base The Feet
          </motion.h1>
          <p>Our Services Are Cloned From Spotify, let's Login </p>
          <a
            href={`${endPoint}?client_id=${clientID}&redirect_uri=${redirectURI},${redirectURI2}&scope=${scope}&response_type=${responseType}`}>
            <Button
              mainButton
              className="bg-dark text-lightGreen"
              title="Log In"></Button>
          </a>
        </div>
      </section>
    </main>
  );
};

export default Welcome;
