import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";

function Register() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>
          {t("nav.register")} | {t("footer.copyright")}
        </title>
      </Helmet>
    </>
  );
}

export default Register;
