import { Link } from "react-router-dom";
import { track } from "../../Pages/PlaylistsPage/types/Types";

const IframeLocalInfo: React.FC<{ track: track }> = ({ track }) => {
  return (
    <>
      <p className="text-lightGreen  rounded-md my-1 bg-dark min-w-44 sm:min-w-32 lg:min-w-44 text-center px-2">
        {track?.artists?.length !== 0 && track?.artists[0]?.name}
      </p>
      <span className="text-lightGreen bg-dark px-2 rounded ">
        <Link className="" to={`/artists/${track.artists[0].id}`}>
          Albums
        </Link>
      </span>
    </>
  );
};

export default IframeLocalInfo;
