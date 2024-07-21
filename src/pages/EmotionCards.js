import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Data from "../services/data";

function EmotionsCards() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>{t("pages.emotions.title.h1")} | {t("footer.copyright")}</title>
      </Helmet>
      <section className="flex flex-col w-9/12 mx-auto">
        <h1 className="mb-4 mt-12">{t("pages.emotions.title.h1")}</h1>
        <div className="border border-slate-300"></div>
        <Data />
      </section>
    </>
  );
}
export default EmotionsCards;