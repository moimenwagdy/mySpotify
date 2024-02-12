const Button: React.FC<{
  title: string;
  className?: string;
  onClick?: () => void;
  mainButton?: boolean;
}> = ({ title, className, onClick, mainButton }) => {
  return (
    <button
      onClick={onClick}
      className={` ${
        mainButton ? "px-7 py-3" : ""
      }  rounded-md ${className}`}>
      {title}
    </button>
  );
};

export default Button;
