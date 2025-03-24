"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { PaymentMethodSchema } from "@/constants/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CARD_HOLDER_NAME_FIELD,
  CARD_NUMBER_FIELD,
  CVV_FIELD,
  DEFAULT_PAYMENT_METHOD_VALUES,
  EXPIRY_DATE_FIELD,
} from "@/constants/form-fields";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SettingsInput from "../settingsInput";
import Image from "next/image";
import { PAYMENT_METHOD, PAYMENT_METHOD_IMAGES } from "@/constants";

interface PaymentMethod {
  id: number;
  type: "Visa" | "MasterCard";
  cardholderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const PaymentMethods = () => {
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      type: "Visa",
      cardholderName: "John Doe",
      cardNumber: "**** **** **** 1234",
      expiryDate: "12/25",
      cvv: "***",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof PaymentMethodSchema>>({
    resolver: zodResolver(PaymentMethodSchema),
    defaultValues: DEFAULT_PAYMENT_METHOD_VALUES,
  });

  function onSubmit(values: z.infer<typeof PaymentMethodSchema>) {
    setMethods((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: values.type,
        cardholderName: values.cardholderName,
        cardNumber: `**** **** **** ${values.cardNumber.slice(-4)}`,
        expiryDate: values.expiryDate,
        cvv: "***",
      },
    ]);

    form.reset();
    setIsOpen(false);
  }

  const handleRemove = (id: number) => {
    setMethods((prev) => prev.filter((method) => method.id !== id));
  };

  return (
    <div className=" max-w-[601px]">
      <h2 className="text-base text-[#1A194D] font-bold mt-6 md:mt-14">
        Payment Method
      </h2>
      <p className="text-sm text-[#62618F] font-medium mt-2">
        Manage billing information and view receips
      </p>

      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex justify-between items-center p-3 "
          >
            <div className="flex flex-row justify-center items-start gap-4">
              <Image
                src={
                  method.type === PAYMENT_METHOD.VISA
                    ? PAYMENT_METHOD_IMAGES.VISA
                    : PAYMENT_METHOD_IMAGES.MASTER_CARD
                }
                alt="visa"
                className="w-[87px] h-[58px]"
                width={0}
                height={0}
              />
              <div className="text-sm font-medium">
                {method.type} - {method.cardNumber}
                <div className="text-xs text-gray-500">
                  {method.cardholderName} | Exp: {method.expiryDate}
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRemove(method.id)}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* Add Payment Method Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-[#201CCD] hover:text-[#201CCD]"
          >
            <Plus color="#201CCD" className="mr-2" />
            Add
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Payment Method</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Label>Card Type</Label>
              <Select
                onValueChange={(value) => {
                  form.setValue("type", value as "Visa" | "MasterCard");
                }}
                value={form.watch("type")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Card Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visa">Visa</SelectItem>
                  <SelectItem value="MasterCard">MasterCard</SelectItem>
                </SelectContent>
              </Select>

              <SettingsInput
                control={form.control}
                {...CARD_HOLDER_NAME_FIELD}
              />
              <SettingsInput control={form.control} {...CARD_NUMBER_FIELD} />

              <div className="grid grid-cols-2 gap-4">
                <SettingsInput control={form.control} {...EXPIRY_DATE_FIELD} />
                <SettingsInput control={form.control} {...CVV_FIELD} />
              </div>

              <Button variant="outline" type="submit">
                Add Payment Method
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentMethods;
