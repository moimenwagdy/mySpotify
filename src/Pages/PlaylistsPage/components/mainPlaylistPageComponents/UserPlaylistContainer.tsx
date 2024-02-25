import { useLoaderData, useNavigate } from "react-router";
import UsersNewPLManage from "./UsersNewPLManage";
import { playlistItem } from "../../types/Types";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { faFlag } from "@fortawesome/free-regular-svg-icons";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../stateRoot/reduxHooks";
import { exitAction } from "../../../../stateRoot/exitSlice";

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
  return (
    <main className="bg-dark p-4 mt-2 rounded-md">
      <aside className="w-[98%] p-2  rounded-md bg-darkGreen roundded-lg mx-auto flex flex-col justify-center items-center lg:flex-row lg:justify-normal lg:items-stretch">
        <section className="w-4/5 lg:w-2/4 flex flex-col">
          <div
            className={`bg-simiDark/60 h-full w-full mx-auto  p-1 flex flex-col rounded-md ${
              noItems
                ? "justify-center items-center "
                : "justify-start items-center gap-y-1"
            }`}>
            <p className="text-white tracking-wide font-bold">User Playlists</p>
            {!noItems ? (
              data.items.map((item) => {
                return (
                  <div
                    key={item.id}
                    className=" px-2 flex w-full bg-lightGreen rounded gap-x-2 gap-y-1 lg:gap-y-0 text-dark  flex-col lg:flex-row justify-around items-center">
                    <p className="font-bold text-white  px-1 rounded">
                      {item.name}
                    </p>
                    <span className="flex flex-row gap-x-2">
                      <button
                        onClick={() => {
                          if (item.tracks.total === 0) {
                            window.alert("Empty Playlist");
                          } else {
                            navigate(
                              `/playlists/playlistdetails?pListId=${item.id}`
                            );
                          }
                        }}
                        // to={`/playlists/playlistdetails?pListId=${item.id}`}
                        className="text-xs text-white px-2 rounded hover:text-lightGreen bg-dark">
                        Show
                      </button>
                      <button className="text-xs text-white px-2 rounded hover:text-lightGreen bg-dark">
                        delete
                      </button>
                    </span>

                    <p className="text-xs text-center w-fit px-1 rounded text-lightGreen bg-dark ">
                      {item.description}
                    </p>
                  </div>
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
          </div>
        </section>
        <section className="w-full lg:w-2/4 h-full">
          <UsersNewPLManage />
        </section>
      </aside>
    </main>
  );
};

export default UserPlaylistContainer;
