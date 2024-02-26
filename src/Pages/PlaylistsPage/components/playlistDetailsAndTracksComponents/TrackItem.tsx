import { ChangeEvent, useState } from "react";
import { playlistItem, track } from "../../types/Types";
import { UseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { setTrackToPlaylist } from "../../functions/setTrackToPlaylist";
import { Link } from "react-router-dom";
import { getUserPlaylists } from "../../functions/userPlayists";

const TrackItem: React.FC<{ track: track }> = ({ track }) => {
  const [show, setShow] = useState<boolean>(false);
  const [playlistID, setPlayistId] = useState("");
  /////

  /////
  const { data: userPlaylists, isFetched }: UseQueryResult<playlistItem> =
    useQuery({
      queryKey: ["userPlaylists"],
      queryFn: getUserPlaylists,
    });
  /////
  isFetched && console.log(userPlaylists);
  ////
  const playlistExist = userPlaylists?.total !== 0;
  /////
  function userPlaylistListHandle() {
    setShow((prv) => !prv);
  }
  /////
  const { mutate } = useMutation({
    mutationKey: ["addTrack"],
    mutationFn: () => {
      return setTrackToPlaylist(playlistID!, track.uri);
    },
  });
  /////
  function addTrackToPlaylist() {
    mutate();
  }
  /////
  function changeHandler(e: ChangeEvent<HTMLSelectElement>) {
    setPlayistId(e.target.value);
  }
  return (
    <>
      <iframe
        className="w-full  mx-auto rounded-xl"
        src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`}
        height="80"
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"></iframe>
      <nav className="flex justify-between text-sm items-center w-[90%] gap-x-3">
        <p className="text-lightGreen  rounded-md my-1 bg-dark px-2">
          {track.artists[0].name}
        </p>
        <div className="flex text-lightGreen gap-x-1 ">
          <button className="bg-dark px-2 rounded-md">Albums</button>
          <button
            onClick={userPlaylistListHandle}
            className="bg-dark px-2 rounded-md">
            add to plylist
          </button>
          {show && playlistExist && (
            <>
              <select
                onChange={changeHandler}
                name="userPlaylist"
                className="text-dark text-center w-32">
                <optgroup label="select">
                  <option value="" selected></option>
                  {playlistExist &&
                    userPlaylists?.items.map((item) => {
                      return (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      );
                    })}
                </optgroup>
              </select>
              <button
                onClick={addTrackToPlaylist}
                className="text-white hover:text-lightGreen">
                submit
              </button>
            </>
          )}
          {show && !playlistExist && (
            <Link to="/playlists" className="text-white hover:text-lightGreen">
              CreatePlaylist
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default TrackItem;
