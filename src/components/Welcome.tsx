import { useState } from "react";
import Button from "../uiux/Button";
import {
  endPoint,
  clientID,
  redirectURI,
  responseType,
  scope,
} from "../utllties/apiCredintials";
import { myToken } from "../utllties/tokenAndDurationControl";
import { AnimatePresence, motion } from "framer-motion";
// import { Link } from "react-router-dom";
const Welcome = () => {
  const token = myToken();
  console.log(token);
  const [isNotExiting, setExit] = useState<boolean>(true);

  function exitHandle() {
    setExit(false);
  }

  return (
    <AnimatePresence>
      {isNotExiting && (
        <main className="h-[100vh]">
          <motion.section
            exit={{ opacity: 0 }}
            className="flex justify-center items-center  bg-smImg  sm:bg-mdImg md:bg-lgImg min-h-full bg-cover absolute top-0 right-0 left-0 z-[0]  ">
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
                href={`${endPoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}&response_type=${responseType}`}>
                <Button
                  onClick={exitHandle}
                  mainButton
                  className="bg-lightGreen/10 outline-3 outline outline-dark text-dark"
                  title="Log In"></Button>
              </a>
            </div>
            {/* <Link to="/home"> To Home</Link> */}
          </motion.section>
        </main>
      )}
    </AnimatePresence>
  );
};

export default Welcome;
