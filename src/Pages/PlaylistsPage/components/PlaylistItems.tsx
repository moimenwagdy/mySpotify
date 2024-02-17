import { useSearchParams } from "react-router-dom";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  defer,
  useRouteLoaderData,
} from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../stateRoot/reduxHooks";
import PlaylistItem from "./PlaylistItem";
import { StyledPagenationButtons } from "./StyledPagenationButtons";
import { myToken } from "../../../utllties/setFutureDate";
import playlistsResponseSlice from "../../../stateRoot/playlistsResponseSlice";
import playlistData from "../Types";

const PlaylistItems: React.FC = () => {
  const { data: playlistsData } = useRouteLoaderData("CPL") as playlistData;
  const dispatch = useAppDispatch();
  const data = useAppSelector(
    (state) => state.playlistResponseSlice.data.playlist
  );
  const defaultOffset = useAppSelector(
    (state) => state.playlistPages.offsetDefaultVal
  );
  const [searchParams] = useSearchParams();
  const offset = searchParams.get("offset");

  Promise.resolve(playlistsData).then((d) => {
    dispatch(playlistsResponseSlice.actions.setPlaylistData(d));
  });
  const exit = useAppSelector((state) => state.exitSlice.exiting);
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
          exit={{ opacity: 0, y: -10 }}
          className="relative flex flex-col">
          <div
            className={`hidden  w-[96%] left-[50%] z-[1] -translate-x-1/2 lg:flex ${
              data.previous === null ? "justify-end" : "justify-between"
            }  absolute top-[50%] -translate-y-1/2`}>
            <StyledPagenationButtons
              key="left"
              title="Prev"
              offset={Number(offset) - defaultOffset}
              hidden={data.previous === null}
            />
            <StyledPagenationButtons
              key="right"
              title="Next"
              offset={Number(offset) + defaultOffset}
              hidden={data.next === null}
            />
          </div>
          <motion.ul
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
            }}
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className={` mx-auto w-[90%] z-10 rounded-md bg-darkGreen  ${
              data && data.items.length < 8 ? "min-h-[175px]" : "min-h-[560px]"
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
export const fetchPlayilist: LoaderFunction = async ({
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
    const error = response.json();
    return error;
  }
  const resolved = response.json();
  return resolved;
};

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({ params, request }) => {
  return defer({ data: fetchPlayilist({ params, request }) });
};
