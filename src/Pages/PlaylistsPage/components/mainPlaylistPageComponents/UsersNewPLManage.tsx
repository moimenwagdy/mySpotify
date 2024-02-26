import { LoaderFunction, useLoaderData } from "react-router";
import { myToken } from "../../../../utllties/tokenAndDurationControl";
import { playlistItem } from "../../types/Types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../stateRoot/reduxHooks";
import { exitAction } from "../../../../stateRoot/exitSlice";
import CreateNewPlaylistForm from "./CreateNewPlaylistForm";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../../../uiux/Button";

const UsersNewPLManage = () => {
  const data = useLoaderData() as playlistItem;
  const dispatch = useAppDispatch();
  function toggleNewPlaylistForm() {
    dispatch(exitAction.newPlaylisToggler());
  }
  const isShown = useAppSelector(
    (state) => state.exitSlice.showNewPlaylistForm
  );
  const noItems = data?.items.length === 0;
  const sudoKey = isShown ? "0" : "1";
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0 },
      }}
      key={sudoKey}
      initial="hidden"
      animate="visible"
      className={`text-center bg-dark/90 rounded-md p-3 ${
        noItems ? "p-3" : ""
      } flex flex-col gap-y-3`}>
      {!noItems && (
        <>
          <p className="text-sm text-white p-2">
            Add Tracks And Enjoy Your Own Playlists
          </p>
          <Link
            to="/categories"
            className="hover:text-lightGreen py-1 px-3 outline outline-1 rounded outline-lightGreen  mx-auto">
            Brwose Categories
          </Link>
          {!isShown && (
            <Button
              onClick={() => {
                !isShown ? dispatch(exitAction.newPlaylisToggler()) : "";
              }}
              title="create new playlist"
              className="hover:text-lightGreen py-1 px-3 outline outline-1 rounded outline-lightGreen  mx-auto"
            />
          )}
        </>
      )}
      {noItems && (
        <>
          <h2 className="text-sm">You don't have any playlists until now</h2>
          <span className="flex flex-col">
            <p className="text-sm text-white/50">start browsing tracks and</p>
            <button
              onClick={toggleNewPlaylistForm}
              className="text-sm text-white/50 hover:text-lightGreen">
              create your own playlist
            </button>
          </span>
        </>
      )}
      <CreateNewPlaylistForm key={sudoKey} />
    </motion.div>
  );
};

export default UsersNewPLManage;

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async () => {
  const tokens = myToken();
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: {
      Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw error.error;
  }
  const myData = await response.json();
  return myData;
};
