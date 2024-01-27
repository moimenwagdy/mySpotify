import { ActionFunction, redirect } from "react-router";
import Logout from "../components/Logout";

const LogoutPage = () => {
  return (
    <div>
      <Logout />
    </div>
  );
};

export default LogoutPage;

// eslint-disable-next-line react-refresh/only-export-components
export const action: ActionFunction = async function () {
  localStorage.clear();
  return redirect("/");
};
