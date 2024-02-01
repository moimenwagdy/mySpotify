import Button from "../uiux/Button";
import Catrgories from "../components/Catrgories";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import categoriesFetch from "../utllties/categoriesFetch";
import { useState } from "react";
import { CategoriesResponse, FetchError } from "../utllties/interfaces";

import { queryClient } from "../utllties/queryClient";
import { motion } from "framer-motion";

const CategoriesPage = () => {
  const [offset, setOffset] = useState<number>(0);

  const {
    data,
    isLoading,
    isError,
    error,
  }: UseQueryResult<CategoriesResponse, FetchError> = useQuery({
    queryKey: ["categories", offset],
    queryFn: ({ signal }) => categoriesFetch({ signal, offset }),
    enabled: queryClient.getQueryData([offset]) !== offset,
    gcTime: 5000,
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
    <>
      <aside className="flex gap-x-10 justify-center items-center">
        <Button title="previous" onClick={decrease} />
        <Button title="next" onClick={increase} />
      </aside>
      <motion.aside
        variants={{
          hidden: { opacity: 0.9, y: -5 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className=" bg-light  p-6 mx-6  mt-1 rounded-md w-fit">
        <motion.ul
          variants={{ visible: { transition: { staggerChildren: 0.09 } } }}
          className="flex flex-wrap justify-around items-start gap-3 ">
          <Catrgories categories={data?.categories} />
        </motion.ul>
      </motion.aside>
      <aside className="flex gap-x-10 justify-center items-center sm:hidden">
        <Button title="previous" onClick={decrease} />
        <Button title="next" onClick={increase} />
      </aside>
    </>
  );
  if (isLoading) {
    content = <p>Loading</p>;
  }
  if (isError) {
    content = <p>{error.data.message}</p>;
  }

  return <>{content}</>;
};

export default CategoriesPage;

// export const Loader: LoaderFunction = async () => {
//   // const tokens = myToken();
//   // const userToken = tokens?.userToken;
//   // const nonUserToken = tokens?.nonUserToken;
//   const response = await fetch(
//     "https://api.spotify.com/v1/browse/cagories/?limit=5",
//     {
//       headers: {
//         Authorization:
//           "Bearer " +
//           "BQCDiDy73v3BhdcoM5q94XG3KrRa1DFktlcPA-eJkEQuy5W_80nmrEffVnNqi037rlMLpMy6hzXlX9Ix7pJhRw5r1ZeyMQQmJDWK9zHP5nHCl2lVGZrOjoZVGymDi3j4mWd96g-Zi9e7qWYZcp2drRDNh1wMrjdFRNnC-S8gEd894QqIeRjtZwVBMzKYbIH9zprwiQXq2ceCrCOQToc",
//       },
//     }
//   );
//   if (!response.ok) {
//     const errorRes = await response.json();
//     throw json(
//       { message: errorRes.error.message },
//       { status: errorRes.error.status }
//     );
//   }

//   if (response.status === 404) {
//     throw json({ message: "Page Not Found" });
//   }

//   const jsonRespnse = await response.json();
//   return jsonRespnse;
// };
