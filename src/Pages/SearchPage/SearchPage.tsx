import { useActionData } from "react-router";
import SearchForm from "./components/SearchForm";
import { fullSearchResult } from "./Types/Types";
import { useEffect } from "react";
import { motion } from "framer-motion";
import SearchTrackResult from "./components/SearchTrackResult";
import SerachPlaylisrResult from "./components/SerachPlaylisrResult";
import AlbumItem from "../AlbumsPage/components/AlbumItem";

const SearchPage = () => {
  const data = useActionData() as fullSearchResult;
  useEffect(() => {
    data && console.log(data);
    data?.error && console.log(data.error);
  }, [data]);
  return (
    <main>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -30 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        className=" p-4 mt-10 rounded w-3/4 mx-auto bg-dark/50">
        <h1 className="text-center text-white font-bold">
          Hit Search And Find The Missing Piece Of Your Day !
        </h1>
        <SearchForm />
      </motion.div>
      {data?.error && (
        <p className="w-1/2 mx-auto text-center text-red-600">
          {data.error.message}{" "}
          <span className="text-xs">
            {" "}
            "Write Your Seach Target And Select Type"
          </span>
        </p>
      )}
      {data?.tracks &&
        data.tracks.items.map((track) => {
          return <SearchTrackResult track={track} />;
        })}
      {data?.playlists &&
        data.playlists.items.map((playlist, i) => {
          return <SerachPlaylisrResult data={playlist} i={i} />;
        })}
      {data?.albums && <AlbumItem data={data.albums} />}
    </main>
  );
};

export default SearchPage;
