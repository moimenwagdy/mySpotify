import ReactDOM from "react-dom";

const Footer = () => {
  return ReactDOM.createPortal(
    <footer className="w-full bg-dark h-16 px-4 py-2 mt-20">
      footer is under maintaining
    </footer>,
    document.getElementById("footer")!
  );
};

export default Footer;
