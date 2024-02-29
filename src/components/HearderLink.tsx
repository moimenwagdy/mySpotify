import { Link } from "react-router-dom";

const HearderLink: React.FC<{ title: string; to: string }> = ({
  title,
  to,
}) => {
  return (
    <Link to={to} className="text-base text-white hover:text-lightGreen">
      {title}
    </Link>
  );
};

export default HearderLink;
