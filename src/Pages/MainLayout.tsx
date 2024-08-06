import { Outlet } from "react-router";
import { useEffect } from "react";
import {
  expirationDuration,
  myToken,
} from "../utllties/tokenAndDurationControl";
import { useSubmit } from "react-router-dom";
import Header from "../components/Header/Header";
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
      <HomeTapsNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
