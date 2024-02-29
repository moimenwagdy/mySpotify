import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { useParams } from "react-router";
import { getAlbums } from "../Functions/FetchAlbums";
import { artistsAlbums } from "../Types/Types";
import { errorContent } from "../../../utllties/interfaces";
import AlbumItem from "./AlbumItem";
import { useState } from "react";
import { queryClient } from "../../../utllties/queryClient";
import LoadingIndecator from "../../../components/LoadingIndecator";
import ErrorFallback from "../../../components/ErrorFallback";

const AlbumItems = () => {
  const params = useParams();
  const id = params.albumID;
  const [albumsOffset, setAlbumsOffset] = useState<number>(0);
  const {
    data,
    isFetched,
    isLoading,
    isError,
    error,
  }: UseQueryResult<artistsAlbums, errorContent> = useQuery({
    queryKey: [albumsOffset],
    queryFn: () => getAlbums(id!, albumsOffset),
    enabled: queryClient.getQueryData([albumsOffset]) !== albumsOffset,
  });
  isFetched && console.log(data);
  console.log(albumsOffset);
  function nextAlbums() {
    setAlbumsOffset((prv) => prv + 5);
  }
  function prevAlbums() {
    setAlbumsOffset((prv) => prv - 5);
  }

  let content = (
    <>
      <div className="w-20 mx-auto flex gap-x-10">
        <button
          className="hover:text-lightGreen  disabled:text-white/50"
          disabled={data?.previous === null}
          onClick={prevAlbums}>
          prev
        </button>
        <button
          className="hover:text-lightGreen disabled:text-white/50"
          disabled={data?.next === null}
          onClick={nextAlbums}>
          next
        </button>
      </div>
      <main className="w-full md:w-[90%] lg:w-[70%] mx-auto ">
        <span className="flex justify-between items-center">
          <h2 className="text-lightGreen text-end w-3/5 text-xl mt-2">
            {data?.items[0]?.artists[0]?.name}
            <span className="text-sm"> albums</span>
          </h2>
          <span className="text-xs self-center mt-2 me-2 ">
            {albumsOffset + 5}/{data?.total}
          </span>
        </span>
        <AlbumItem data={data!} />
      </main>
    </>
  );
  if (isLoading) {
    content = <LoadingIndecator />;
  }
  if (isError) {
    content = <ErrorFallback ErrorData={error} />;
  }
  return <>{content}</>;
};

export default AlbumItems;
