import {} from "react-router";

const InputField: React.FC<{
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  id?: string;
  className?: string;
  autoFocus?: boolean;
  playlist?: boolean;
}> = ({
  playlist,
  name,
  placeholder,
  type,
  value,
  id,
  className,
  autoFocus,
}) => {
  return (
    <input
      autoFocus={autoFocus}
      type={type}
      className={` py-1 px-4 bg-transparent outline outline-2 ${
        className ? className : ""
      } ${
        playlist
          ? "text-dark dark:text-lightGreen dark:placeholder:text-white/50 placeholder:text-white/50 outline-white/50 focus:outline-white"
          : "placeholder:text-dark/90 dark:placeholder:text-white/50 text-dark dark:text-lightGreen dark:outline-lightGreen/50 dark:focus:outline-lightGreen outline-white/50 focus:outline-white"
      }   rounded-md`}
      name={name}
      placeholder={placeholder}
      value={value}
      id={id}
    />
  );
};

export default InputField;
