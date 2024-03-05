import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchArtistitem } from "../Types/Types";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ArtistItem: React.FC<{ artist: SearchArtistitem }> = ({ artist }) => {
  const navigate = useNavigate();
  function openArtistAlbums() {
    navigate(`/artists/${artist.id}`);
  }
  return (
    <aside
      onClick={openArtistAlbums}
      className="cursor-pointer group hover:outline-lightGreen px-4 py-4 flex justify-start items-center rounded-xl full gap-x-20 outline outline-2 outline-darkGreen">
      <div className="flex flex-col justify-center items-center">
        <img src={artist.images[2].url} className="min-w-full rounded-lg" />
        <p className="text-white/50 flex justify-center items-center gap-x-2">
          <span className="text-xs text-lightGreen">
            <FontAwesomeIcon icon={faHeart} />
          </span>
          {artist.followers.total}
        </p>
      </div>
      <div className="">
        <p className="text-lightGreen text-3xl font-bold">{artist.name}</p>
        <div className="text-secondryColor group-hover:text-white transition-colors delay-150">
          <Link to={`/artists/${artist.id}`}>Albums</Link>
        </div>
      </div>
    </aside>
  );
};

export default ArtistItem;
