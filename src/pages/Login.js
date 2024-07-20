import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../context/ThemeContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Button from "../components/common/Button";
// import { AuthContext } from '../context/AuthContext';

function Login() {
  // const { user } = useContext(AuthContext);
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const logIn = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
    }
  };

  const backgroundImage = isDarkMode
    ? "url('/images/bg/bg-login-dark.svg')"
    : "url('/images/bg/bg-login-light.svg')";

  return (
    <>
      <Helmet>
        <title>
          {t("nav.login")} | {t("footer.copyright")}
        </title>
      </Helmet>
      <div className="min-h-screen -mt-[150px] md:-mt-[76px] flex items-center justify-center">
        <div
          className="invisible md:visible md:w-1/2 h-screen bg-local bg-cover bg-no-repeat bg-center"
          style={{ backgroundImage }}
        ></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
          style={{ backgroundImage }}
        ></div>
        <div className="relative md:w-1/2 flex flex-col justify-center items-center">
          <h1 className="text-4xl text-gray-100 md:text-[#3c9dae] mb-4">
            {t("pages.login.title")}
          </h1>
          <h2 className="mb-8 text-gray-100 md:text-[#3c9daeff]">
            {t("pages.login.subtitle")}
          </h2>
          {error && <p className="error w-72">{error}</p>}
          <div className="flex gap-3 my-2">
            <p className="w-16 flex items-center">{t("pages.login.email")} </p>
            <input
              className="w-full rounded-full px-3 py-1 text-gray-800"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex gap-3 my-2">
            <p className="w-16 flex items-center">
              {t("pages.login.password")}
            </p>
            <input
              className="w-full rounded-full px-3 py-1 text-gray-800"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-72">
            <Link
              to="/forgot-password"
              className="text-gray-800 hover:text-gray-900 flex self-end text-sm w-fit"
            >
              {t("pages.login.forget")}
            </Link>
            <Button
              text={t("pages.login.login")}
              onClick={logIn}
              type="submit"
              variant="login"
            />
          </div>
          <Link
            className="flex my-8 text-gray-800 hover:text-gray-900"
            to="/create-account"
          >
            {t("pages.login.register")}
          </Link>
        </div>{" "}
      </div>
    </>
  );
}

export default Login;
