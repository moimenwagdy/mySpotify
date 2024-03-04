import { useLoaderData, useNavigate } from "react-router";
import UsersNewPLManage from "./UsersNewPLManage";
import { playlistItem } from "../../types/Types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../stateRoot/reduxHooks";
import { exitAction } from "../../../../stateRoot/exitSlice";
import { motion } from "framer-motion";
import { useEffect } from "react";
import playlistPages from "../../../../stateRoot/playlistPages";
import ShowPlaylistButton from "./ShowPlaylistButton";

const UserPlaylistContainer = () => {
  const data = useLoaderData() as playlistItem;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formIsOpened = useAppSelector(
    (state) => state.exitSlice.showNewPlaylistForm
  );
  const noItems = data.items.length === 0;
  function openNewPlaylistForm() {
    if (formIsOpened) {
      return;
    } else dispatch(exitAction.newPlaylisToggler());
  }
  useEffect(() => {
    data && dispatch(playlistPages.actions.setUserPlaylists(data));
  }, [data, dispatch]);

  function showUserPlaylist(total: number, id: string) {
    localStorage.removeItem("offset");
    localStorage.removeItem("limit");
    if (total === 0) {
      window.alert("empty playlist");
    } else {
      navigate(`/playlists/playlistdetails?pListId=${id}`);
    }
  }
  return (
    <main className="bg-dark p-4 mt-2 rounded-md lg:min-h-[50vh]">
      <section className="w-[98%] p-2  rounded-md  bg-darkGreen roundded-lg mx-auto flex flex-col justify-center items-center lg:flex-row lg:justify-normal lg:items-stretch ">
        <section className="w-4/5 lg:w-2/4 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-simiDark/60  h-full w-full mx-auto gap-y-2  p-1 flex flex-col rounded-md ${
              noItems
                ? "justify-center items-center "
                : "justify-start items-center gap-y-1"
            }`}>
            <p className="text-white tracking-wide font-bold">User Playlists</p>
            {!noItems ? (
              data.items.map((item) => {
                return (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    key={item.id}
                    className={`p-1 flex w-full justify-start bg-transparent outline outline-1 outline-lightGreen rounded gap-x-2 gap-y-1 lg:gap-y-0 text-dark  flex-col lg:flex-row items-center`}>
                    <p className="font-bold text-white w-1/3 text-center  px-1 rounded">
                      {item.name}
                    </p>
                    <ShowPlaylistButton
                      id={item.id}
                      total={item.tracks.total}
                      showUserPlaylist={showUserPlaylist}
                    />
                    <p
                      className={`text-xs text-center ${
                        item.description === "" ? "w-0 p-0" : "w-1/3 p-1"
                      } rounded text-lightGreen bg-dark`}>
                      {item.description}
                    </p>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center gap-y-2 flex flex-col">
                <p>Empty</p>
                <FontAwesomeIcon
                  className="text-4xl text-lightGreen"
                  icon={faFlag}
                />
              </div>
            )}
            {!formIsOpened && (
              <button onClick={openNewPlaylistForm}>
                {noItems ? "Create One" : "Add Playlist"}
              </button>
            )}
          </motion.div>
        </section>
        <section className="w-full lg:w-2/4 h-full">
          <UsersNewPLManage />
        </section>
      </section>
    </main>
  );
};

export default UserPlaylistContainer;
