import { useSearchParams } from "react-router-dom";

const ArtisitsImage = () => {
  const [params] = useSearchParams();
  const artistID = params.get("IMG");

  return (
    <div className="w-1/3 lg:w-1/4 lg:self-start ">
      <img src={artistID!} alt="AtristsImage" className="rounded-md" />
    </div>
  );
};

export default ArtisitsImage;
