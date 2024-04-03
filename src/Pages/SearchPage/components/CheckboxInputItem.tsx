import { motion } from "framer-motion";

const CheckboxInputItem: React.FC<{
  type: string;
  name: string;
  value: string;
  id: string;
}> = ({ id, name, type, value }) => {
  return (
    <>
      <motion.label
        transition={{ type: "spring" }}
        className="checkbox-label w-full text-center text-dark dark:text-white/70 outline rounded outline-1  outline-white/70 hover:outline-white dark:outline-darkGreen/70  dark:hover:text-lightGreen/90 hover:text-darkerGreen cursor-pointer "
        htmlFor={id}>
        {name}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          className="cursor-pointer sr-only "
        />
      </motion.label>
    </>
  );
};

export default CheckboxInputItem;
