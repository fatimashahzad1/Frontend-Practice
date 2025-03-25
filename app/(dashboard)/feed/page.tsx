'use client';
import LeftContainer from '@/components/dashboard/feed/left-container';
import MainContainer from '@/components/dashboard/feed/main-container';
import RightContainer from '@/components/dashboard/feed/right-container';
import { DASHBOARD_SIMILAR_PAGES, POST_TYPE } from '@/constants';
import { usePosts } from '@/hooks/use-posts';
import React from 'react';

const Feed = () => {
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePosts(POST_TYPE.FEED);
  return (
    <div className="grid grid-cols-12 bg-background">
      <LeftContainer type={DASHBOARD_SIMILAR_PAGES.FEED} />
      <MainContainer
        posts={posts}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isLoading={isLoading}
      />
      <RightContainer />
    </div>
  );
};

export default Feed;
