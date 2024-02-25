import { track } from "../../types/Types";

const TrackItem: React.FC<{ track: track }> = ({ track }) => {
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
          <button className="bg-dark px-2 rounded-md">Details</button>
        </div>
      </nav>
    </>
  );
};

export default TrackItem;
