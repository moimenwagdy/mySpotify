const Button: React.FC<{
  title: string;
  className?: string;
  onClick?: () => void;
  mainButton?: boolean;
  disabled?: boolean;
}> = ({ disabled, title, className, onClick, mainButton }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` ${
        mainButton ? "px-7 py-3" : ""
      }  rounded-md ${className} dark:disabled:bg-simiDark dark:disabled:text-dark/50`}>
      {title}
    </button>
  );
};

export default Button;
