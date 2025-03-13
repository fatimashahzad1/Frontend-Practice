'use client';
import LeftContainer from '@/components/dashboard/feed/left-container';
import MainContainer from '@/components/dashboard/feed/main-container';
import RightContainer from '@/components/dashboard/feed/right-container';
import { DASHBOARD_SIMILAR_PAGES, POST_TYPE } from '@/constants';
import { usePosts } from '@/hooks/use-posts';
import React from 'react';

const Feed = () => {
  const { data } = usePosts(POST_TYPE.FEED);
  return (
    <div className='grid grid-cols-12 bg-[#EEF4FD]'>
      <LeftContainer type={DASHBOARD_SIMILAR_PAGES.FEED} />
      <MainContainer posts={data} />
      <RightContainer />
    </div>
  );
};

export default Feed;
