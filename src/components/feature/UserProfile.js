import React from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";

function UserProfile() {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="flex flex-col w-4/5 mx-auto my-10">
      <h1>{t("pages.userProfile.title")}</h1>
      <div className="border border-slate-300 my-3"></div>
      <div className="flex w-full my-10">
        <div className="w-1/2">
          <img
            className=""
            src="/images/illustration/profile.svg"
            alt="profile"
          ></img>
        </div>
        <div className="flex flex-col w-1/2 px-9 text-2xl gap-5">
          <p>
            {t("pages.userProfile.email")} {user.email}
          </p>
          <p>
            {t("pages.userProfile.password")} {user.email}
          </p>
          <p>
            {t("pages.userProfile.name")} {user.displayName || "Not set"}
          </p>
          <p>
            {t("pages.userProfile.role")} {user.displayName || "Not set"}
          </p>
          <p>
            {t("pages.userProfile.birthday")} {user.displayName || "Not set"}
          </p>
        </div>
      </div>
      <p>UID: {user.uid}</p>
      
    </div>
  );
}

export default UserProfile;
