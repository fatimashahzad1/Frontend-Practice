import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuthButton = () => {
  return (
    <button
      type="submit"
      className="flex flex-row justify-center gap-16 py-6 shadow-google sm:min-w-[300px] w-full rounded-md mb-[75px]"
    >
      <FcGoogle className="w-6 h-6" />
      Register with Google
    </button>
  );
};

export default OAuthButton;
