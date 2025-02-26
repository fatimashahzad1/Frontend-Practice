import LeftContainer from '@/components/dashboard/feed/left-container';
import MainContainer from '@/components/dashboard/feed/main-container';
import RightContainer from '@/components/dashboard/feed/right-container';
import { DASHBOARD_SIMILAR_PAGES } from '@/constants';
import React from 'react';

const Jobs = () => {
  return (
    <div className='grid grid-cols-12 bg-[#EEF4FD]'>
      <LeftContainer type={DASHBOARD_SIMILAR_PAGES.JOBS} />
      <MainContainer type={DASHBOARD_SIMILAR_PAGES.JOBS} />
      <RightContainer type={DASHBOARD_SIMILAR_PAGES.JOBS} />
    </div>
  );
};

export default Jobs;
