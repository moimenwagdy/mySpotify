import {} from "react-router";

const InputField: React.FC<{
  type: string;
  name: string;
  placeholder: string;
}> = ({ name, placeholder, type }) => {
  return (
    <input
      type={type}
      className="text-darkGreen py-1 px-4 bg-transparent placeholder:text-white/50 outline outline-2 outline-lightGreen/50 focus:outline-lightGreen rounded-md"
      name={name}
      placeholder={placeholder}
    />
  );
};

export default InputField;
