import { UserCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link } from "react-router-dom";

function UserIcon() {
  return (
    <>
      <Link
        to="/user/profile"
        className="hover:fill-[#3c9daeff] dark:fill-gray-100 flex items-center justify-center"
      >
        <UserCircleIcon className="w-8 h-8" />
      </Link>
    </>
  );
}
export default UserIcon;
