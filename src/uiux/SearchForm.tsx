import Button from "./Button";
const SearchForm = () => {
  return (
    <div>
      <form>
        <div className="flex gap-x-1 justify-center items-center">
          <input
            className="w-24 h-4 border-none outline-none text-black text-xs ps-2"
            id="search"
            type="search"></input>
          <Button
            title="search"
            className="text-sm bg-simiDark px-1 "></Button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
