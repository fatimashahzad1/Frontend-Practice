import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import CardImage from "@/public/assets/dashboard/articleImg.png";

type PeopleCardProps = {
  title: string;
  description: string;
  actionTitle: string;
  action: () => void;
  actionButtonClasses: string;
  actionDisabled: boolean;
};

export function PeopleCard({
  title,
  description,
  action,
  actionTitle,
  actionButtonClasses,
  actionDisabled,
}: PeopleCardProps) {
  return (
    <Card className=" w-[320px] h-[384px] rounded-3xl self-center mx-auto">
      <CardContent className="p-0">
        <Image
          src={CardImage}
          width={0}
          height={0}
          style={{ width: "100%", height: "200px" }}
          alt="card image"
          className="rounded-t-3xl"
        />
        <div className="p-5">
          <p className="text-black text-base overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </p>
          <p className="text-[#62618F] text-base overflow-hidden whitespace-nowrap text-ellipsis">
            {description}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col justify-between w-full">
        <Button
          variant="outline"
          className={`w-full text-lg font-medium h-[52px] ${actionButtonClasses} `}
          onClick={action}
          disabled={actionDisabled}
        >
          {actionTitle}
        </Button>
      </CardFooter>
    </Card>
  );
}
