import { isRouteErrorResponse, useRouteError } from "react-router";
import Button from "../uiux/Button";
import { Link } from "react-router-dom";
import { errorContent } from "../utllties/interfaces";

const ErrorFallback: React.FC<{ ErrorData?: errorContent }> = ({
  ErrorData,
}) => {
  const error = useRouteError() as errorContent;
  let title: string = error.message;
  console.log(ErrorData?.message);
  console.log(error.message);
  console.log(isRouteErrorResponse(error));
  if (isRouteErrorResponse(error)) {
    if (error.data.message) {
      title = error.data.message;
      console.log(error);
    } else {
      if (error && error.data) {
        title = error.data;
        console.log(error);
      } else title = error.statusText;
      console.log(error);
    }
  }
  if (ErrorData) {
    title = ErrorData?.message;
    console.log(ErrorData);
  }

  return (
    <div className="flex flex-col justify-center items-center mt-24 gap-y-6">
      <div className="text-center text-white">{title}</div>
      <Link to="/home" className="">
        <Button title="Back" className="bg-light text-dark px-3" />
      </Link>
    </div>
  );
};

export default ErrorFallback;
