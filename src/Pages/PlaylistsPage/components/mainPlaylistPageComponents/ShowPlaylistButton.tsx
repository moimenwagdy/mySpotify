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
        className={` text-xs  dark:text-light text-dark px-3 py-1 rounded hover:text-darkerGreen dark:hover:text-lightGreen bg-light dark:bg-dark`}>
        Show
      </button>
    </span>
  );
};

export default ShowPlaylistButton;
