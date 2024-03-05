import PlaylistItem from "../../PlaylistsPage/components/category'sPlaylistsComponents/PlaylistItem";
import { playlistContent } from "../../PlaylistsPage/types/Types";

const SerachPlaylisrResult: React.FC<{
  data: playlistContent;
  i: number;
}> = ({ data, i }) => {
  return <PlaylistItem data={data} i={i} fromSearch={true} />;
};

export default SerachPlaylisrResult;
