import Button from "../../../uiux/Button";
import { artistsAlbums } from "../Types/Types";

const AlbumItem: React.FC<{ data: artistsAlbums }> = ({ data }) => {
  return (
    <>
      {data?.items.map((item) => {
        const date = new Date(item.release_date);
        const formattedDate = date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });

        return (
          <section key={item.id} className=" bg-lightGreen my-2  p-2  rounded-md relative">
            <span className=" z-10 flex flex-col bg-dark/90  px-4 py-2 rounded-md justify-between ">
              <span className="flex items-center justify-around w-full">
                <div className="flex flex-col gap-y-1 w-3/4">
                  <h4 className="text-3xl font-bold">{item.name}</h4>
                  <p className="text-sm text-white/50">
                    released {formattedDate}
                  </p>
                </div>
                <div className="w-1/4 flex justify-center items-center relative">
                  <img
                    src={item.images[1].url}
                    className="rounded-xl min-w-[100px]  "
                  />
                  <p className="absolute -bottom-5 text-white/50 text-xs">
                    Spotify copyRight
                  </p>
                </div>
              </span>
              <Button
                title="Tracks"
                className=" z-10 outline outline-1 outline-lightGreen w-20 md:w-28 py-1 mx-auto "
              />
            </span>
            <p className="absolute select-none left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-[100px] md:text-[220px] opacity-[.05] z-[0] text-lightGreen/50">
              Spotify
            </p>
          </section>
        );
      })}
    </>
  );
};

export default AlbumItem;
