import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LightDarkControler = () => {
  const htmlElement = document.querySelector("html");
  const [isDark, setIsDark] = useState<boolean>(true);
  const hasDarkClass = htmlElement?.classList.contains("dark");
  const modeFromlocalStorage = localStorage.getItem("mode");

  useEffect(() => {
    if (!modeFromlocalStorage) {
      htmlElement!.className = "dark";
    }
    if (modeFromlocalStorage) {
      htmlElement!.className = modeFromlocalStorage;
    }
    if (hasDarkClass) {
      setIsDark(true);
    } else setIsDark(false);
  }, [hasDarkClass, htmlElement, isDark, modeFromlocalStorage]);

  function toggleDarkLightMode(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    if (htmlElement?.className === "dark") {
      htmlElement!.className = "light";
      localStorage.setItem("mode", "light");
      setIsDark(false);
    } else {
      htmlElement!.className = "dark";
      localStorage.setItem("mode", "dark");
      setIsDark(true);
    }
  }

  return (
    <section>
      <div
        onClick={toggleDarkLightMode}
        className={`w-16 h-7 rounded-full flex items-center cursor-pointer ring-2  ${
          isDark
            ? "bg-darkerGreen ring-lightGreen"
            : "bg-lightGreen ring-darkerGreen"
        }`}>
        <motion.div
          initial={{ x: isDark ? 5 : 32 }}
          animate={{ x: isDark ? 40 : 5 }}
          onClick={toggleDarkLightMode}
          className={`w-5 h-5 cursor-pointer rounded-[40%] ${
            isDark ? "bg-lightGreen" : "bg-darkerGreen"
          } `}></motion.div>
        <span
          className={`text-xl absolute flex justify-center items-center top-1/2 ${
            isDark ? "left-2" : "left-9"
          } -translate-y-[50%]`}>
          <FontAwesomeIcon icon={isDark ? faMoon : faSun} />
        </span>
      </div>
    </section>
  );
};

export default LightDarkControler;
