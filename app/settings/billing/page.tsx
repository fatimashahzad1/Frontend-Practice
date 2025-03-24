import React from "react";
import Heading from "../heading";
import BillingTable from "./billing-table";
import { Button } from "@/components/ui/button";
import PaymentMethods from "./payment-method";

const Billing = () => {
  return (
    <div className="min-h-screen py-8 md:py-16 md:pl-14 px-5 md:pr-4 w-full">
      <Heading title="Billing" />
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-9">
          <h2 className="text-base text-[#1A194D] font-bold mt-6 md:mt-14">
            Order History
          </h2>
          <p className="text-sm text-[#62618F] font-medium mt-2">
            Manage billing information and view receips
          </p>
          <BillingTable />
          <Button variant="link" className="text-sm font-normal text-[#1565D8]">
            Load more
          </Button>
          <PaymentMethods />
        </div>
        <div className="col-span-12 md:col-span-3 bg-green-500 p-4 text-white ">
          Second Element (3 cols)
        </div>
      </div>
    </div>
  );
};

export default Billing;
