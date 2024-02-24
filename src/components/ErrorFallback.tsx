import { isRouteErrorResponse, useRouteError } from "react-router";
import Button from "../uiux/Button";
import { errorContent } from "../utllties/interfaces";
import DialogModal from "./DialogModal";

const ErrorFallback: React.FC<{ ErrorData?: errorContent }> = ({
  ErrorData,
}) => {
  const error = useRouteError() as errorContent;
  let title: string = "";
  if (ErrorData) {
    console.log("it is an ErrorData From Props");
    title = ErrorData?.message;
  }
  if (!ErrorData && error) {
    title = error.message;
  }
  console.log(error);
  if (isRouteErrorResponse(error)) {
    title = error.statusText;
    console.log("it s is a Route Error Witch You Are searching for and still");
  }
  function backControl() {
    history.back();
  }
  return (
    <DialogModal>
      <div className="flex flex-col justify-center items-center mt-24 gap-y-6">
        <p className="text-center text-white">{title}</p>
        <Button
          onClick={backControl}
          title="Back"
          className="bg-light text-dark px-3"
        />
      </div>
    </DialogModal>
  );
};

export default ErrorFallback;
