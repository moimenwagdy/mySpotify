import ReactDOM from "react-dom";

const Footer = () => {
  return ReactDOM.createPortal(
    <footer className="w-full bg-dark h-26 px-4 py-2 mt-20 flex justify-between gap-x-6 items-center">
      <span className="flex flex-col gap-y-1 justify-center items-center">
        <img
          src="../../images/Logo.png"
          className="h-8 rounded-lg self-start"></img>
        <p className="text-xs">Copyrights for spotify & mySpotify Developer </p>
      </span>
      <span>github - facebook - twitter - email</span>
      <span className="h-full ">
        <ul className="text-xs h-full flex justify-center items-end gap-x-2">
          <li className="cursor-pointer  hover:text-lightGreen">
            Privacy ploicy
          </li>
          -<li className="cursor-pointer  hover:text-lightGreen">Contact us</li>
          -
          <li className="cursor-pointer  hover:text-lightGreen">
            Developer Word
          </li>
        </ul>
      </span>
    </footer>,
    document.getElementById("footer")!
  );
};

export default Footer;
