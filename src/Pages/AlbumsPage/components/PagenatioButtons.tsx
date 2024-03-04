import { artistsAlbums } from "../Types/Types";

const PagenatioButtons: React.FC<{
  data: artistsAlbums;
  prevAlbums: () => void;
  nextAlbums: () => void;
}> = ({ data, nextAlbums, prevAlbums }) => {
  return (
    <div className="w-1/6 mx-auto flex justify-between mt-4">
      <button
        className="hover:text-lightGreen  disabled:text-white/50"
        disabled={data?.previous === null}
        onClick={prevAlbums}>
        Prev
      </button>
      <button
        className="hover:text-lightGreen disabled:text-white/50"
        disabled={data?.next === null}
        onClick={nextAlbums}>
        Next
      </button>
    </div>
  );
};

export default PagenatioButtons;
