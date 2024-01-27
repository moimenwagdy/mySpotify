const Button: React.FC<{
  title: string;
  className: string;
  onClick?: () => void;
  mainButton?: boolean;
}> = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={` ${props.mainButton ? "px-7 py-3" : ""}  rounded-md ${
        props.className
      }`}>
      {props.title}
    </button>
  );
};

export default Button;
