import {} from "react-router";

const InputField: React.FC<{
  type: string;
  name: string;
  placeholder?: string;
  value?: string;
  id?: string;
  className?: string;
  autoFocus?: boolean;
}> = ({ name, placeholder, type, value, id, className, autoFocus }) => {
  return (
    <input
      autoFocus={autoFocus}
      type={type}
      className={`text-lightGreen py-1 px-4 bg-transparent ${
        className ? className : ""
      } placeholder:text-white/50 outline outline-2 outline-lightGreen/50 focus:outline-lightGreen rounded-md`}
      name={name}
      placeholder={placeholder}
      value={value}
      id={id}
    />
  );
};

export default InputField;
