import { Link, json } from "react-router-dom";
import { LoaderFunction, LoaderFunctionArgs, defer } from "react-router";
import { myToken } from "../../utllties/setFutureDate";
import { playlistItem } from "./Types";
import Button from "../../uiux/Button";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../stateRoot/reduxHooks";
import { exitAction } from "../../stateRoot/exitSlice";
const PlaylistItem: React.FC = () => {
  // const [params] = useSearchParams();
  // const offset = params.get("offset");
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.playlistResponseSlice);
  const exit = useAppSelector((state) => state.exitSlice.exiting);
  function playlistOpen(): void {
    dispatch(exitAction.setExit());
  }
  console.log(data);
  return (
    <AnimatePresence>
      {!exit && (
        <motion.main
          variants={{
            hidden: { opacity: 0, y: -30 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          exit={{
            opacity: 0,
            transition: { type: "spring" },
          }}>
          <section className=" text-center mt-2">
            <h1 className="text-center text-lg font-[600]">{data.message}</h1>
          </section>
          <motion.ul
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            className={`mt-2 mx-auto w-[97%] rounded-md bg-darkGreen  ${
              data.playlists.items.length < 6
                ? "min-h-[200px]"
                : "min-h-[560px]"
            }   flex gap-3 py-3 px-2 flex-wrap justify-center`}>
            {data &&
              data.playlists.items.map((item: playlistItem) => {
                return (
                  <motion.li
                    key={item.name}
                    className="w-full cursor-pointer md:max-h-44 sm:w-4/5 group hover:bg-dark/90 md:w-4/5 lg:min-w-[33%] rounded-md lg:max-w-[49%] bg-dark/80  flex p-1 "
                    variants={{
                      hidden: { opacity: 0, y: -50 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    whileHover={{ scale: 1.01 }}>
                    <a
                      onClick={playlistOpen}
                      href="/categories"
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
                          <p className="text-sm text-white/70 max-w-full 	text-pretty">
                            {item.description}
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
                    </a>
                  </motion.li>
                );
              })}
          </motion.ul>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default PlaylistItem;

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const tokens = myToken();
  const searcParams = new URL(request.url).searchParams;
  const offset = searcParams.get("offset");
  const id = params.id;

  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(
    `https://api.spotify.com/v1/browse/categories/${id}/playlists/?limit=10&offset=${offset}`,
    {
      headers: {
        Authorization: "Bearer " + (userToken ? userToken : nonUserToken),
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    console.log(error);
    throw json({ message: error.message }, { status: error.status });
  }

  const resolved = response.json();

  return defer({ playlists: resolved });
};
