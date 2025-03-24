import React from "react";
import Heading from "../heading";
import GeneralForm from "./general-form";

const General = () => {
  return (
    <div className="min-h-screen py-8 md:py-16 md:pl-14 px-5 md:pr-4 max-md:w-full md:w-[597px]">
      <Heading title="General" />
      <GeneralForm />
    </div>
  );
};

export default General;
