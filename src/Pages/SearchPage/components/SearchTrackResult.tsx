import TrackItem from "../../PlaylistsPage/components/playlistDetailsAndTracksComponents/TrackItem";
import { track } from "../Types/Types";

const SearchTrackResult: React.FC<{ track: track }> = ({ track }) => {
  return <TrackItem track={track} />;
};

export default SearchTrackResult;
