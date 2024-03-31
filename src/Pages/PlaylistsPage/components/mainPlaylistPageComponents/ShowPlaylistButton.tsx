const ShowPlaylistButton: React.FC<{
  id: string;
  total?: number;
  showUserPlaylist: (total: number, id: string) => void;
}> = ({ id, total, showUserPlaylist }) => {
  return (
    <span className="flex flex-row gap-x-2 w-1/4 justify-center items-center">
      <button
        onClick={() => {
          showUserPlaylist(total!, id);
        }}
        className={` text-xs  text-white px-3 py-1 rounded hover:text-lightGreen bg-dark`}>
        Show
      </button>
    </span>
  );
};

export default ShowPlaylistButton;
