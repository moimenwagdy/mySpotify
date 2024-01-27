import { Outlet } from "react-router";
import { useEffect } from "react";
import { expirationDuration, useToken } from "../utllties/setFutureDate";
import { useSubmit } from "react-router-dom";
import Header from "../components/Navbar";

const MainLayout = () => {
  const submit = useSubmit();
  const token = useToken();
  const expirationStarted = localStorage.getItem("tokenExpire");
  useEffect(() => {
    const timer = expirationDuration();
    console.log(timer);
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
      <Outlet />
    </>
  );
};

export default MainLayout;
