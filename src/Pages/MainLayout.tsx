import { Outlet } from "react-router";
import { useEffect } from "react";
import {
  expirationDuration,
  myToken,
} from "../utllties/tokenAndDurationControl";
import { useSubmit } from "react-router-dom";
import Header from "../components/Header/Header";
import NavUserDataContainer from "../components/Navbar/NavUserDataContainer";
import HomeTapsNavbar from "../components/Navbar/HomeTapsNavbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const submit = useSubmit();
  const token = myToken();
  const expirationStarted = localStorage.getItem("tokenExpire");
  useEffect(() => {
    const timer = expirationDuration();

    if (token?.expired) {
      submit(null, { method: "POST", action: "logout" });
    }
    if (expirationStarted && timer) {
      setTimeout(() => {
        submit(null, { method: "POST", action: "logout" });
      }, timer);
    }
  });
  return (
    <>
      <Header />
      <main className="flex justify-end -mt-3 sm:-mt-1 mb-2">
        <NavUserDataContainer />
      </main>
      <HomeTapsNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
