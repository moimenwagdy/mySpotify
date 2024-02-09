import { useParams } from "react-router";

const PlaylistItems = () => {
  const params = useParams();

  console.log(params.id);
  return <div className="text-white">{params.id}</div>;
};

export default PlaylistItems;
export const loader: LoaderFunction = async () => {};
