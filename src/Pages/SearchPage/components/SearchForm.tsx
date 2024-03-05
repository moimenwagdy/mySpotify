import {
  ActionFunction,
  ActionFunctionArgs,
  Form,
  useNavigation,
} from "react-router-dom";
import InputField from "../../../components/InputField";
import { searchQuery_Types } from "../functions/searchQuery_Types";
import CheckBoxItems from "./CheckBoxItems";

const SearchForm = () => {
  const submit = useNavigation();
  const submitting = submit.state === "submitting";
 
  return (
    <section className="flex justify-center w-full py-10 rounded px-2 sm:px-0">
      <Form method="post" className="w-full sm:w-3/4 md:w-1/2">
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 flex-col sm:flex-row sm:gap-y-0 gap-y-4 justify-center items-center">
            <InputField
              type="text"
              name="targetvalue"
              id="targetvalue"
              placeholder="Find Music "
              className="w-full h-12"
              autoFocus={true}
            />
            <div className="flex justify-center">
              <button
                className=" outline  outline-1 bg-lightGreen text-dark ring-inset ring-offset-2 ring-1 ring-darkGreen hover:bg-lightGreen transition-all delay-150 ring-offset-dark font-[400] outline-lightGreen/50 hover:outline-lightGreen text-sm min-w-24 py-1 rounded ">
                {submitting ? "Searching ... " : "Search"}
              </button>
            </div>
          </div>
          <div className=" flex justify-start  itrems-center gap-x-2">
            <CheckBoxItems />
          </div>
        </div>
      </Form>
    </section>
  );
};
export default SearchForm;

// eslint-disable-next-line react-refresh/only-export-components
export const searchAction: ActionFunction = async ({
  request,
}: ActionFunctionArgs) => {
  const data = await request.formData();
  const targetvalue: string | null = data.get("targetvalue") as string | null;
  const track: string | null = data.get("Track") as string | null;
  const album: string | null = data.get("Album") as string | null;
  const artist: string | null = data.get("Artist") as string | null;
  const playlist: string | null = data.get("Playlist") as string | null;
  let searchTypes = "" as string;
  const arr = [track, album, artist, playlist].filter(Boolean) as string[];
  if (arr.length === 1) {
    searchTypes = arr[0];
  } else {
    searchTypes = arr.join("%2C");
  }
  console.log(searchTypes);
  const response = await searchQuery_Types(targetvalue!, searchTypes);
  return response;
};
