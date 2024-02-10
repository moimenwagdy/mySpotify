import { Link, json } from "react-router-dom";
import {
  Await,
  LoaderFunction,
  LoaderFunctionArgs,
  defer,
  useLoaderData,
} from "react-router";
import { myToken } from "../../utllties/setFutureDate";
import { Suspense } from "react";
import LoadingIndecator from "../../components/LoadingIndecator";
import playlistType, { playlistItem } from "./Types";
import Button from "../../uiux/Button";
const PlaylistItem: React.FC = () => {
  const { playlists } = useLoaderData() as playlistType;
  console.log(playlists);
  return (
    <Suspense fallback={<LoadingIndecator />}>
      <Await resolve={playlists}>
        {(lists) => {
          console.log(lists);
          return (
            <>
              <h1 className="text-center text-lg my-2 font-[600]">
                {lists.message}
              </h1>
              <section className=" mt-2 w-[97%] mx-auto rounded-md bg-darkGreen min-h-[560px]  flex gap-3 p-2 flex-wrap justify-center">
                {lists &&
                  lists.playlists.items.map((item: playlistItem) => {
                    return (
                      <aside className="w-full max-h-44 sm:w-4/5 md:w-3/5 lg:min-w-[33%] rounded-md lg:max-w-[48%] bg-dark/80  flex p-1 gap-x-1 ">
                        <img
                          className="w-28 rounded-md"
                          src={item.images[0].url}
                          alt="Pl"></img>
                        <div className="flex flex-col justify-between items-start w-full">
                          <div className="shrink">
                            <h2 className="text-lg font-[700] text-lightGreen">
                              {item.name}
                            </h2>
                            <p className="text-sm text-white/70 max-w-full">
                              {item.description}
                            </p>
                          </div>
                          <div className="ms-1">
                            <Link to="tracks">
                              <Button
                                title="Tracks"
                                className="bg-lightGreen px-6 py-1 text-black/80 font-[600]"
                              />
                            </Link>
                          </div>
                          <p className="text-xs self-end mt-[-10px] text-white/50 me-1">
                            Owner {item.owner.display_name}
                          </p>
                        </div>
                      </aside>
                    );
                  })}
              </section>
            </>
          );
        }}
      </Await>
    </Suspense>
  );
};

export default PlaylistItem;

// eslint-disable-next-line react-refresh/only-export-components
export const loader: LoaderFunction = async ({
  params,
}: LoaderFunctionArgs) => {
  const tokens = myToken();
  const id = params.id;
  const userToken = tokens?.userToken;
  const nonUserToken = tokens?.nonUserToken;
  const response = await fetch(
    `https://api.spotify.com/v1/browse/categories/${id}/playlists`,
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

// eslint-disable-next-line react-refresh/only-export-components
