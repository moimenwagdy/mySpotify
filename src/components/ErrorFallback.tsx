import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import Button from "../uiux/Button";
import { errorContent } from "../utllties/interfaces";
import DialogModal from "./DialogModal";
import { useSubmit } from "react-router-dom";
import { useEffect } from "react";

const ErrorFallback: React.FC<{ ErrorData?: errorContent }> = ({
  ErrorData,
}) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const error = useRouteError() as errorContent;
  const errorRef: string = `Unexpected token 'U', "User not r"... is not valid JSON`;
  const SpotifyTerms = `According to Spotify API rules, developer should include your Email as a potential user, " after 12 seconds, YOU WILL BE AUTOMATICALLY REDIRECTED TO THE MAIN PAGE, ALLOWING YOU TO CONTINUE USING THE WEBSITE AS A SUDO-LOGGED-IN USER "`;
  let title: string = "";
  if (ErrorData) {
    if (ErrorData!.message === errorRef) {
      title = SpotifyTerms;
    } else title = ErrorData?.message;
  }

  if (!ErrorData && error) {
    if (error?.message === errorRef) {
      title = SpotifyTerms;
    } else title = error?.message;
  }
  if (ErrorData?.message && error) {
    title = ErrorData.message;
  }
  useEffect(() => {
    if (error?.message === errorRef || ErrorData?.message === errorRef) {
      setTimeout(() => {
        submit(null, { method: "POST", action: "/logout" });
      }, 12000);
    }
  }, [
    error?.message,
    error,
    submit,
    ErrorData,
    ErrorData?.message,
    navigate,
    errorRef,
  ]);

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
        <p className="text-center text-white dark:text-lightGreen">{title}</p>
        <Button
          disabled={
            (ErrorData && ErrorData!.message === errorRef) ||
            (error && error.message === errorRef)
          }
          onClick={backControl}
          title="Back"
          className="bg-light text-dark px-3"
        />
      </div>
    </DialogModal>
  );
};

export default ErrorFallback;
