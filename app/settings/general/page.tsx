import React from "react";
import Heading from "../heading";
import GeneralForm from "./generalForm";

const General = () => {
  return (
    <div className="mt-16 ml-14 max-sm:mt-8 max-sm:ml-5 mr-4">
      <Heading title="General" />
      <GeneralForm />
    </div>
  );
};

export default General;
