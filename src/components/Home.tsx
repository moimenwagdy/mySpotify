import { Link } from "react-router-dom";
const Home: React.FC = () => {
  return (
    <>
      <Link className="mt-24 block" to="/">
        back
      </Link>
    </>
  );
};

export default Home;
