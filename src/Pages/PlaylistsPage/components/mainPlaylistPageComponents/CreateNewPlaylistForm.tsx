import { Form, useActionData, useNavigation } from "react-router-dom";
import InputField from "../../../../components/InputField";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../stateRoot/reduxHooks";
import Button from "../../../../uiux/Button";
import { exitAction } from "../../../../stateRoot/exitSlice";
import { errorContent } from "../../../../utllties/interfaces";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";

const CreateNewPlaylistForm: React.FC = () => {
  const data: errorContent = useActionData() as errorContent;

  const show = useAppSelector((state) => state.exitSlice.showNewPlaylistForm);
  const dispatch = useAppDispatch();
  function closeForm() {
    dispatch(exitAction.newPlaylisToggler());
  }
  function submitForm() {
    setTimeout(() => {
      dispatch(exitAction.newPlaylisToggler());
    }, 200);
  }
  const { state } = useNavigation();
  const submitting = state === "submitting";
  const idle = state === "idle";
  const formRef = useRef<HTMLFormElement>(null);
  if (idle) {
    formRef.current?.reset();
  }
  return (
    <AnimatePresence>
      {show && (
        <Form method="post" ref={formRef}>
          <motion.div
            exit={{ y: 60 }}
            className="flex flex-col w-full md:w-[50%] mx-auto gap-y-4 p-3 justify-around">
            <InputField
              type="text"
              name="playlistName"
              placeholder="playlistName"
              playlist={true}
            />
            <InputField
              type="text"
              name="playlistDes"
              placeholder="playlist Description"
              playlist={true}
            />
            <div className="flex gap-x-4 text-light justify-center items-center">
              <label>
                <input
                  type="radio"
                  name="public"
                  value="true"
                  className="mx-1"
                  defaultChecked
                />
                public
              </label>
              <label>
                <input
                  className=" mx-1 "
                  type="radio"
                  name="public"
                  value="false"
                />
                private
              </label>
            </div>
            <>
              {data && <p className="text-xs text-red-600">{data.message}</p>}
            </>
            <div className="flex justify-center items-center gap-x-2">
              <Button
                onClick={submitForm}
                title={submitting ? "Submitting" : "Save"}
                className="w-full py-1 outline outline-1 hover:text-lightGreen outline-darkGreen  mx-auto"
              />
              <Button
                title="Close"
                onClick={closeForm}
                className="w-full py-1 outline outline-1  outline-light  mx-auto"
              />
            </div>
          </motion.div>
        </Form>
      )}
    </AnimatePresence>
  );
};

export default CreateNewPlaylistForm;
