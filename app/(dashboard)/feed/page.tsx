import LeftContainer from '@/components/dashboard/feed/left-container';
import MainContainer from '@/components/dashboard/feed/main-container';
import RightContainer from '@/components/dashboard/feed/right-container';
import { Card, CardContent } from '@/components/ui/card';
import { DASHBOARD_SIMILAR_PAGES } from '@/constants';
import React from 'react';

function ComponentThree() {
  return (
    <Card className='p-4 shadow-md col-span-3'>
      <CardContent className='text-center'>Component Three</CardContent>
    </Card>
  );
}
const Feed = () => {
  return (
    <div className='grid grid-cols-12 bg-[#EEF4FD]'>
      <LeftContainer type={DASHBOARD_SIMILAR_PAGES.FEED} />
      <MainContainer />
      <RightContainer />
    </div>
  );
};

export default Feed;
