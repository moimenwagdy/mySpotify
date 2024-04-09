import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import categoriesFetch from "./functions/categoriesFetch";
import { useState } from "react";
import { errorContent } from "../../components/Error/types/Types";
import { queryClient } from "../../utllties/queryClient";
import Categories from "./components/Categories";
import Button from "../../components/Button";
import ErrorFallback from "../../components/Error/ErrorFallback";
import LoadingIndecator from "../../components/LoadingIndecator";
import PagenationButton from "./components/PagenationButton";
import { CategoriesResponse } from "./types/types";
const CategoriesPage = () => {
  const [offset, setOffset] = useState<number>(0);
  //using react query to get categories
  const {
    data,
    isError,
    error,
    isLoading,
  }: UseQueryResult<CategoriesResponse, errorContent> = useQuery({
    queryKey: ["categories", offset],
    queryFn: ({ signal }) => categoriesFetch({ signal, offset }),
    //revalidate the query if the current offset changed compared with the cashed offset in the memory
    enabled: queryClient.getQueryData([offset]) !== offset,
    // set the time between every query run, when the user navigate between taps to 20sec, avoiding unneeded requests
    staleTime: 20000,
  });
  function increase(): void {
    if (data?.categories?.next !== null) {
      setOffset((prv) => prv + 10);
    } else return;
  }
  function decrease(): void {
    if (data?.categories?.previous !== null) {
      setOffset((prv) => prv - 10);
    } else return;
  }

  let content = (
    <div className="relative mt-8">
      <div className=" w-1/4 flex mx-auto gap-x-6 justify-center items-center sm:hidden">
        <Button title="Previous" onClick={decrease} />
        <Button title="Next" onClick={increase} />
      </div>
      <aside className="absolute z-10 translate-x-[-50%] left-1/2 top-1/2 translate-y-[-50%] w-[80%] flex justify-between">
        <PagenationButton xValue={-150} icon={faBackward} onClick={decrease} />
        <PagenationButton xValue={150} icon={faForward} onClick={increase} />
      </aside>
      <Categories data={data!} key={offset} />
      <div className=" w-1/4 flex mx-auto gap-x-6 justify-center items-center sm:hidden">
        <Button title="Previous" onClick={decrease} />
        <Button title="Next" onClick={increase} />
      </div>
    </div>
  );
  if (isLoading) {
    content = <LoadingIndecator />;
  }

  if (isError) {
    content = <ErrorFallback ErrorData={error} />;
  }

  return <main className="min-h-[50vh]">{content}</main>;
};

export default CategoriesPage;
