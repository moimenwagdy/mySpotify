import { SearchArtistitem } from "../Types/Types";
import ArtistItem from "./ArtistItem";

const SearchArtistsResults: React.FC<{ artist: SearchArtistitem }> = ({
  artist,
}) => {
  return (
    <>
      <ArtistItem artist={artist} />
    </>
  );
};

export default SearchArtistsResults;
