'use client';
import LeftContainer from '@/components/dashboard/feed/left-container';
import MainContainer from '@/components/dashboard/feed/main-container';
import RightContainer from '@/components/dashboard/feed/right-container';
import { DASHBOARD_SIMILAR_PAGES } from '@/constants';
import { useJobs } from '@/hooks/use-jobs';
import React from 'react';

const Jobs = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useJobs({ pageParam: 0, perPage: 5 });
  return (
    <div className="grid grid-cols-12 bg-[#EEF4FD]">
      <LeftContainer type={DASHBOARD_SIMILAR_PAGES.JOBS} />
      <MainContainer
        type={DASHBOARD_SIMILAR_PAGES.JOBS}
        jobs={data}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
      <RightContainer type={DASHBOARD_SIMILAR_PAGES.JOBS} />
    </div>
  );
};

export default Jobs;
