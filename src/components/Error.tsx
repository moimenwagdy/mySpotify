import { isRouteErrorResponse, useRouteError } from "react-router";
import Button from "../uiux/Button";
import { Link } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  let title: string = "";

  if (isRouteErrorResponse(error)) {
    title = error.data.message;
  }

  return (
    <div className="flex flex-col justify-center items-center mt-52 gap-y-6">
      <div className="text-center text-white">{title}</div>
      <Link to=".." className="">
        <Button title="Back" className="bg-light text-dark " />
      </Link>
    </div>
  );
};

export default Error;
