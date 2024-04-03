import { faForward, faBackward } from "@fortawesome/free-solid-svg-icons";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import categoriesFetch from "../../utllties/categoriesFetch";
import { useState } from "react";
import { CategoriesResponse, errorContent } from "../../utllties/interfaces";
import { queryClient } from "../../utllties/queryClient";
import Categories from "./components/Categories";
import Button from "../../uiux/Button";
import ErrorFallback from "../../components/ErrorFallback";
import LoadingIndecator from "../../components/LoadingIndecator";
import PagenationButton from "./components/PagenationButton";
const CategoriesPage = () => {
  const [offset, setOffset] = useState<number>(0);
  const {
    data,
    isError,
    error,
    isLoading,
  }: UseQueryResult<CategoriesResponse, errorContent> = useQuery({
    queryKey: ["categories", offset],
    queryFn: ({ signal }) => categoriesFetch({ signal, offset }),
    enabled: queryClient.getQueryData([offset]) !== offset,
    gcTime: 1000,
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
      <Categories data={data} key={offset} />
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
    console.log(error);
    content = <ErrorFallback ErrorData={error} />;
  }

  return <main className="">{content}</main>;
};

export default CategoriesPage;
