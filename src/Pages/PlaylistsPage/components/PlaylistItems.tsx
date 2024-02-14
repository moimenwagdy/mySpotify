import { json, useSearchParams } from "react-router-dom";
import { LoaderFunction, LoaderFunctionArgs, defer } from "react-router";
import { myToken } from "../../../utllties/setFutureDate";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "../../../stateRoot/reduxHooks";
import PlaylistItem from "./PlaylistItem";
import { StyledPagenationButtons } from "./StyledPagenationButtons";

const PlaylistItems: React.FC = () => {
  const data = useAppSelector((state) => state.playlistResponseSlice);
  const exit = useAppSelector((state) => state.exitSlice.exiting);
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
  );
  const [searchParams] = useSearchParams();
  const offset = searchParams.get("offset");
  return (
    <AnimatePresence>
      {!exit && (
        <motion.section
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          initial="hidden"
          animate="visible"
          exit={{
            opacity: 0,
            transition: { type: "spring" },
          }}
          className="relative flex flex-col">
          <div
            className={`hidden  w-[96%] left-[50%] z-[1] -translate-x-1/2 lg:flex ${
              data.playlists.previous === null
                ? "justify-end"
                : "justify-between"
            }  absolute top-[50%] -translate-y-1/2`}>
            <StyledPagenationButtons
              key="left"
              title="Prev"
              offset={Number(offset) - defaultOffset}
              hidden={data.playlists.previous === null}
            />
            <StyledPagenationButtons
              key="right"
              title="Next"
              offset={Number(offset) + defaultOffset}
              hidden={data.playlists.next === null}
            />
          </div>
          <motion.ul
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            className={` mt-2 mx-auto w-[90%] z-10 rounded-md bg-darkGreen  ${
              data.playlists.items.length < 8
                ? "min-h-[175px]"
                : "min-h-[560px]"
            }   flex gap-3 py-3 px-2 flex-wrap justify-center `}>
            <PlaylistItem />
          </motion.ul>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default PlaylistItems;

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({
  params,
  request,
}: LoaderFunctionArgs) => {
  const tokens = myToken();
  const searcParams = new URL(request.url).searchParams;
  const offset = searcParams.get("offset");
  const limit = searcParams.get("limit");
  const id = params.id;

  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(
    `https://api.spotify.com/v1/browse/categories/${id}/playlists/?limit=${limit}&offset=${offset}`,
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

  return defer({ playlists: await resolved });
};
