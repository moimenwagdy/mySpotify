import { useActionData } from "react-router";
import SearchForm from "./components/SearchForm";
import { fullSearchResult } from "./Types/Types";
import { useEffect } from "react";
import { motion } from "framer-motion";
import SearchTrackResult from "./components/SearchTrackResult";
import SerachPlaylisrResult from "./components/SerachPlaylisrResult";
import AlbumItem from "../AlbumsPage/components/AlbumItem";
import SectionResultCard from "./components/SectionResultCard";
import SearchArtistsResults from "./components/SearchArtistsResults";

const SearchPage = () => {
  const data = useActionData() as fullSearchResult;
  useEffect(() => {
    data && console.log(data);
    data?.error && console.log(data.error);
  }, [data]);
  return (
    <main className="flex flex-col gap-y-10">
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
        {data?.error && (
          <p className="sm:w-1/2 mx-auto text-center text-red-600">
            {data.error.message}{" "}
            <span className="text-xs">
              {" "}
              "Write Your Seach Target And Select Type"
            </span>
          </p>
        )}
      </motion.div>
      {(data?.albums || data?.artists || data?.artists || data?.tracks) && (
        <h1 className="text-center">Results</h1>
      )}
      <section className="flex flex-col gap-y-10">
        {data?.tracks && (
          <SectionResultCard>
            <h1 className="font-bold">Tracks</h1>
            {data?.tracks &&
              data.tracks.items.map((track) => {
                return <SearchTrackResult key={track.id} track={track} />;
              })}
          </SectionResultCard>
        )}
        {data?.albums && (
          <SectionResultCard>
            {" "}
            <h1 className="font-bold">Albums</h1>
            {data?.albums && <AlbumItem data={data.albums} />}
          </SectionResultCard>
        )}
        {data?.playlists && (
          <SectionResultCard>
            <h1 className="self-start font-bold">Playlists</h1>
            {data?.playlists &&
              data.playlists.items.map((playlist, i) => {
                return (
                  <SerachPlaylisrResult
                    key={playlist.id}
                    data={playlist}
                    i={i}
                  />
                );
              })}
          </SectionResultCard>
        )}
        {data?.artists && (
          <SectionResultCard>
            <h1 className="self-start font-bold">Artist</h1>
            {data?.artists &&
              data.artists.items.map((artist) => {
                return <SearchArtistsResults key={artist.id} artist={artist} />;
              })}
          </SectionResultCard>
        )}
      </section>
    </main>
  );
};

export default SearchPage;
