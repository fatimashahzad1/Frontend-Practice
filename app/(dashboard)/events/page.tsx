"use client";
import LeftContainer from "@/components/dashboard/feed/left-container";
import MainContainer from "@/components/dashboard/feed/main-container";
import RightContainer from "@/components/dashboard/feed/right-container";
import { DASHBOARD_SIMILAR_PAGES, POST_TYPE } from "@/constants";
import { usePosts } from "@/hooks/use-posts";
import React from "react";

const Events = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    usePosts(POST_TYPE.EVENT);
  return (
    <div className="grid grid-cols-12 bg-[#EEF4FD] h-full">
      <LeftContainer type={DASHBOARD_SIMILAR_PAGES.EVENTS} />
      <MainContainer
        posts={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
      <RightContainer type={DASHBOARD_SIMILAR_PAGES.EVENTS} />
    </div>
  );
};

export default Events;
