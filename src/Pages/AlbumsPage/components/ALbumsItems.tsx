import { UseQueryResult, useQuery } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router";
import { getAlbums } from "../Functions/FetchAlbums";
import { artistsAlbums } from "../Types/Types";
import { errorContent } from "../../../utllties/interfaces";
import AlbumItem from "./AlbumItem";
import { useState } from "react";
import { queryClient } from "../../../utllties/queryClient";
import LoadingIndecator from "../../../components/LoadingIndecator";
import ErrorFallback from "../../../components/ErrorFallback";
import Button from "../../../uiux/Button";
import PagenatioButtons from "./PagenatioButtons";

const AlbumItems = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.artistsID;
  const pListId = localStorage.getItem("pListId");
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
    setAlbumsOffset((prv) => prv + 15);
  }
  function prevAlbums() {
    setAlbumsOffset((prv) => prv - 15);
  }
  function backToArtistPl() {
    navigate(`/playlists/playlistdetails?pListId=${pListId}`);
  }

  let content = (
    <>
      <PagenatioButtons
        data={data!}
        nextAlbums={nextAlbums}
        prevAlbums={prevAlbums}
      />
      <main className="w-full md:w-[90%] lg:w-[50%] mx-auto ">
        <span className="flex justify-between items-center">
          <h2 className="text-lightGreen text-end w-3/5 text-xl mt-2">
            {data?.items[0]?.artists[0]?.name}
            <span className="text-sm"> albums</span>
          </h2>
          <span className="text-xs self-center mt-2 me-2 ">
            {data && albumsOffset + 15 > data!.total
              ? data!.total
              : albumsOffset + 15}
            /{data?.total}
          </span>
        </span>
        <AlbumItem data={data!} />
        <PagenatioButtons
          data={data!}
          nextAlbums={nextAlbums}
          prevAlbums={prevAlbums}
        />
        <Button
          title={`Back To Playlist`}
          className="w-1/2 text-center mx-auto block text-white/50 hover:text-lightGreen mt-10"
          onClick={backToArtistPl}
        />
      </main>
    </>
  );
  if (isLoading) {
    content = <LoadingIndecator />;
  }
  if (isError) {
    content = <ErrorFallback ErrorData={error} />;
  }
  return (
    <main className="min-h-[190vh] sm:min-h-[250vh] lg:min-h-[180vh]">
      {content}
    </main>
  );
};

export default AlbumItems;
