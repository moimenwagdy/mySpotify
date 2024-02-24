

const PlaylistTracksImagedetails: React.FC<{
  total: number;
  followers: number;
  image: string;
}> = ({ total, followers, image }) => {
  return (
    <div className=" md:bg-secondryColor/50  rounded-xl mt-4 md:mt-6 w-2/5 mx-auto lg:mx-0 flex flex-col-reverse gap-y-2 justify-center items-center md:min-h-[800px]">
      {/* // path={`/playlists/${PreviousUrlId}?offset=${
      //   offset ? offset : 0
      // }&limit=${limit ? limit : defaultOffset}`}
    // style={`background-image: url()`} */}
      <div className=" px-6 py-1 rounded-md">
        <p className="text-sm  text-center text-white ">
          Followers {followers}
        </p>
        <p className="text-sm  text-center text-white ">{total} Tracks</p>
      </div>
      <img
        src={`${image}`}
        alt="PlayListIcon"
        className="rounded-md w-[400px]"></img>
    </div>
  );
};

export default PlaylistTracksImagedetails;
