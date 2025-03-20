'use client';
import React, { useEffect, useRef } from 'react';
import StorySlider from './story-slider';
import { PostCard } from './post-card';
import { jobs } from '@/mocks/dashboard';
import { ArticleCard } from './article-card';
import { DASHBOARD_SIMILAR_PAGES } from '@/constants';
import Image from 'next/image';
import { InfiniteData } from "@tanstack/react-query";
import Spinner from "@/components/icons/spinner";
import useUser from "@/hooks/use-user";


type MainContainerProps = {
  type?: string;
  posts?: InfiniteData<Post[]>; // Type for paginated data
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean
};

const MainContainer = ({ type, posts, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading }: MainContainerProps) => {
  const observerRef = useRef(null);
  const { data: user } = useUser()
  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);
  return (
    <div className='col-span-6 max-md:col-span-12 w-full p-6 min-h-screen'>
      <StorySlider />
      <PostCard />
      {type !== DASHBOARD_SIMILAR_PAGES.JOBS &&
        <>
          {isLoading && (
            <div className="flex justify-center items-center py-10 gap-2">
              <Spinner onlySpinner width="20px" />
              <p className="text-lg font-semibold">Loading posts...</p>
            </div>
          )}
          {posts?.pages.map((page, pageIndex) =>
            page.map((post, index) => (
              <ArticleCard key={post.id} postDetails={post} preview={false} userId={user?.id} />
            ))
          )}
        </>
      }
      {/* Infinite Scroll Trigger (Only when there are more pages) */}
      {type !== DASHBOARD_SIMILAR_PAGES.JOBS && hasNextPage && <div ref={observerRef} className="h-10" />}

      {/* Loading Indicator */}
      {type !== DASHBOARD_SIMILAR_PAGES.JOBS && isFetchingNextPage && <p className="text-center mt-4">Loading more posts...</p>}

      {type === DASHBOARD_SIMILAR_PAGES.JOBS && (
        <div className='bg-white px-4 py-7 rounded-xl'>
          <h1 className='text-xl font-bold'>Find jobs the easy way</h1>
          <p className='text-sm '>
            Broaden your job search with curated collections
          </p>
          {jobs.map((job, index) => (
            <div
              className='flex items-center gap-4 my-4 border-b last:border-b-0 pb-4'
              key={`job-${index}`}
            >
              <Image
                src={job.imageUrl}
                alt='Avatar'
                className='w-[69px] h-16'
                width={0}
                height={0}
              />
              <div className='flex flex-col gap-1'>
                <h2 className='max-md:text-sm text-[18px] max-md:font-semibold font-bold text-[#1565D8]'>
                  {job.role}
                </h2>
                <h3 className='max-md:text-xs text-sm font-semibold text-black'>
                  {job.companyName}
                </h3>
                <p className='max-sm:text-[10px] text-[13px]'>
                  {[job?.city, job?.state].filter((item) => item).join(',')}|{' '}
                  {`$${job.price}/${job.frequency}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainContainer;
