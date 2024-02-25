import { Link, useParams } from "react-router-dom";

const PlaylistTracksImagedetails: React.FC<{
  total: number;
  followers: number;
  image: string;
}> = ({ total, followers, image }) => {
  const params = useParams();
  const PreviousUrlId = params.id;
  const offset = localStorage.getItem("offset");
  const limit = localStorage.getItem("limit");
  return (
    <>
      <div className="relative md:bg-secondryColor/50  rounded-xl mt-4 md:mt-6 w-2/5 mx-auto lg:mx-0 flex flex-col gap-y-2 justify-evenly items-center md:min-h-[800px]">
        {/* // path={`/playlists/${PreviousUrlId}?offset=${
      //   offset ? offset : 0
      // }&limit=${limit ? limit : defaultOffset}`}
    // style={`background-image: url()`} */}
        <div className="rounded-md flex flex-col justify-center items-center">
          <p className="text-sm  text-center text-lightGreen bg-dark/20 px-1 rounded-md font-thin">
            followers <span className=" text-xs"> {followers}</span>
          </p>
          <p className="text-sm text-center w-fit text-lightGreen bg-dark/20 px-1 rounded-md font-thin">
            <span className="text-xs">{total}</span> tracks
          </p>
        </div>
        <img
          src={`${image}`}
          alt="PlayListIcon"
          className="rounded-md w-[400px] "></img>
        <p
          id="hh"
          className="hidden md:block -rotate-90 text-[160px] md:absolute opacity-20 md:left-[20%] md:-translate-x-[50%]">
          mySpotify
        </p>
        <Link
          to={`/playlists/${PreviousUrlId}?limit=${limit}&offset=${offset}`}
          className="text-lightGreen bg-simiDark hover:bg-dark transition duration-500  text-sm px-3 py-1 rounded-md">
          Back To Playlist
        </Link>
      </div>
    </>
  );
};

export default PlaylistTracksImagedetails;
