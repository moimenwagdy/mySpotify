import { motion } from "framer-motion";
import { exitAction } from "../../../../stateRoot/exitSlice";
import { useAppDispatch, useAppSelector } from "../../../../stateRoot/reduxHooks";
import { playlistContent } from "../../types/Types";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../../uiux/Button";
import { useEffect } from "react";

const PlaylistItem: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const offset = searchParams.get("offset");
  const limit = searchParams.get("limit");
  useEffect(() => {
    localStorage.setItem("offset", offset!);
    localStorage.setItem("limit", limit!);
  }, [limit, offset]);
  async function playlistOpen(id: string) {
    dispatch(exitAction.setExit());
    setTimeout(() => {
      navigate(`playlistdetails?pListId=${id}`);
    }, 100);
  }
  const data = useAppSelector(
    (state) => state.playlistResponseSlice.data.playlist
  );

  return (
    <>
      {data.items.map((item: playlistContent, i) => {
        const CleanDescription = item.description.split("");
        const cleanTarget = CleanDescription.findIndex((r) => r === "<");
        if (cleanTarget !== -1) {
          CleanDescription.splice(cleanTarget, CleanDescription.length);
        }
        return (
          <motion.li
            key={item.name}
            className="w-full cursor-pointer md:max-h-44 sm:w-4/5 group hover:bg-dark/90 md:w-4/5 lg:min-w-[33%] rounded-md lg:max-w-[49%] bg-dark/80  flex p-1 "
            variants={{
              hidden: { opacity: 0, x: i % 2 === 0 ? -50 : 50 },
              visible: { opacity: 1, x: 0 },
            }}
            whileHover={{ scale: 1.01 }}>
            <ul
              onClick={() => playlistOpen(item.id)}
              // to={`/playlistdetails?pListId=${item.id}`}
              className="flex w-full h-full gap-x-1">
              <img
                className="w-28 rounded-md grow-0"
                src={item.images[0].url}
                alt="Pl"></img>
              <div className="flex flex-col justify-between items-start w-full">
                <article className="text-wrap">
                  <h2 className="text-lg font-[700] text-lightGreen">
                    {item.name}
                  </h2>
                  <p className="text-sm text-white/70 group-hover:text-white/90  max-w-full 	text-pretty">
                    {CleanDescription.join("")}
                  </p>
                </article>
                <div className="ms-1">
                  <Link to="tracks">
                    <Button
                      title="Tracks"
                      className="bg-dark group-hover:bg-light group-hover:text-dark duration-300 delay-200 px-3 py-2 text-darkGreen font-[600]"
                    />
                  </Link>
                </div>
                <p className="text-xs self-end mt-[-10px] text-white/50 me-1">
                  Owner {item.owner.display_name}
                </p>
              </div>
            </ul>
          </motion.li>
        );
      })}
    </>
  );
};

export default PlaylistItem;
