import { Link } from "react-router-dom";

const HearderLink: React.FC<{ title: string; to: string }> = ({
  title,
  to,
}) => {
  return (
    <Link to={to} className=" text-white hover:text-lightGreen font-[900]">
      {title}
    </Link>
  );
};

export default HearderLink;
