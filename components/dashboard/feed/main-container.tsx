'use client';
import React from 'react';
import StorySlider from './story-slider';
import { PostCard } from './post-card';
import { jobs } from '@/mocks/dashboard';
import { ArticleCard } from './article-card';
import { DASHBOARD_SIMILAR_PAGES } from '@/constants';
import Image from 'next/image';
import { useDashboardContext } from '@/contexts/dashboard-context';

const MainContainer = ({ type }: { type?: string }) => {
  const { posts } = useDashboardContext();
  return (
    <div className="col-span-6 max-md:col-span-12 w-full p-6">
      <StorySlider />
      <PostCard />
      {type !== DASHBOARD_SIMILAR_PAGES.JOBS &&
        posts?.map((post: Post, index: number) => (
          <ArticleCard key={index} postDetails={post} />
        ))}

      {type === DASHBOARD_SIMILAR_PAGES.JOBS && (
        <div className="bg-white px-4 py-7 rounded-xl">
          <h1 className="text-xl font-bold">Find jobs the easy way</h1>
          <p className="text-sm ">
            Broaden your job search with curated collections
          </p>
          {jobs.map((job, index) => (
            <div
              className="flex items-center gap-4 my-4 border-b last:border-b-0 pb-4"
              key={`key-${index}`}
            >
              <Image
                src={job.imageUrl}
                alt="Avatar"
                className="w-[69px] h-16"
                width={0}
                height={0}
              />
              <div className="flex flex-col gap-1">
                <h2 className="max-md:text-sm text-[18px] max-md:font-semibold font-bold text-[#1565D8]">
                  {job.role}
                </h2>
                <h3 className="max-md:text-xs text-sm font-semibold text-black">
                  {job.companyName}
                </h3>
                <p className="max-sm:text-[10px] text-[13px]">
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
