import { useLoaderData, useNavigate } from "react-router";
import UsersNewPLManage from "./UsersNewPLManage";
import { playlistContent, playlistItem } from "../../types/Types";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../stateRoot/reduxHooks";
import { exitAction } from "../../../../stateRoot/exitSlice";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import playlistPages from "../../../../stateRoot/playlistPages";
import ShowPlaylistButton from "./ShowPlaylistButton";
import UserPlaylistShortcutItem from "./UserPlaylistShortcutItem";
import { myToken } from "../../../../utllties/tokenAndDurationControl";
import { nonUserPlaylistsActions } from "../../../../stateRoot/nonUserPLaylists";
import { EmptyPlaylists } from "./EmptyPlaylists";

const UserPlaylistContainer = () => {
  const token = myToken();
  const userToken = token?.userToken;
  const nonUserToken = token?.nonUserToken;
  const data = useLoaderData() as playlistItem | null;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [handleDel, setHandleDel] = useState<boolean>(false);
  const formIsOpened = useAppSelector(
    (state) => state.exitSlice.showNewPlaylistForm
  );
  const nonUserPlayLists = useAppSelector(
    (state) => state.nonUserPlaylists.items
  );
  const noItems = data?.items.length === 0;
  const nullData = data === null;
  const nonUserPlaylistsExist = nonUserPlayLists.length !== 0;
  function openNewPlaylistForm() {
    if (formIsOpened) {
      return;
    } else dispatch(exitAction.newPlaylisToggler());
  }

  function deletePlaylist(id: string) {
    setHandleDel(true);
    dispatch(nonUserPlaylistsActions.deletePlaylist({ id: id }));
    setHandleDel(false);
  }

  useEffect(() => {
    data && dispatch(playlistPages.actions.setUserPlaylists(data));
  }, [data, dispatch]);

  function showUserPlaylist(total: number, id: string) {
    localStorage.removeItem("offset");
    localStorage.removeItem("limit");
    const tragetPlaylist = nonUserPlayLists.find((item) => {
      return item.id === id;
    });
    if (total === 0 || tragetPlaylist?.uris.length === 0) {
      window.alert("empty playlist");
    } else {
      userToken && navigate(`/playlists/playlistdetails?pListId=${id}`);
      nonUserToken &&
        navigate(
          `/playlists/localPlaylists?pListId=${tragetPlaylist?.uris.join(
            "%2C"
          )}`
        );
    }
  }
  let content = <p>Playlists</p>;
  if (userToken) {
    content = (
      <>
        {!noItems && !nullData ? (
          data?.items?.map((item) => {
            return (
              <UserPlaylistShortcutItem key={item.id} item={item}>
                <ShowPlaylistButton
                  id={item.id}
                  total={item.tracks.total}
                  showUserPlaylist={showUserPlaylist}
                />
              </UserPlaylistShortcutItem>
            );
          })
        ) : (
          <EmptyPlaylists />
        )}
      </>
    );
  }
  if (nonUserToken) {
    content = (
      <AnimatePresence>
        {nonUserPlaylistsExist && !handleDel ? (
          nonUserPlayLists.map((item: playlistContent) => {
            return (
              <UserPlaylistShortcutItem key={item.id} item={item}>
                <ShowPlaylistButton
                  id={item?.id}
                  showUserPlaylist={showUserPlaylist}
                />
                {nonUserToken && (
                  <button
                    className="text-xs text-dark dark:text-light dark:hover:text-lightGreen hover:text-darkerGreen"
                    onClick={() => deletePlaylist(item.id)}>
                    Delete
                  </button>
                )}
              </UserPlaylistShortcutItem>
            );
          })
        ) : (
          <EmptyPlaylists />
        )}
      </AnimatePresence>
    );
  }
  return (
    <main className="bg-offWhite/50 dark:bg-dark p-4 mt-8 rounded-md lg:min-h-[50vh]">
      <section className="w-[98%] p-2  rounded-md  bg-darkGreen dark:bg-darkerGreen roundded-lg mx-auto flex flex-col justify-center items-center lg:flex-row lg:justify-normal lg:items-stretch ">
        <section className="w-4/5 lg:w-2/4 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative bg-simiDark/60 pb-8  h-full w-full mx-auto gap-y-2  p-1 flex flex-col rounded-md ${
              noItems
                ? "justify-center items-center "
                : "justify-start items-center gap-y-1"
            }`}>
            <p className="text-white tracking-wide font-bold">User Playlists</p>
            {content}
            {!formIsOpened && (
              <button
                className="absolute bottom-0"
                onClick={openNewPlaylistForm}>
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
