'use client';
import React from 'react';
import Image from 'next/image';
import CardImage from '@/public/assets/dashboard/articleImg.png';
import { useParams } from 'next/navigation';
import useArticleDetail from '@/hooks/use-article-detail';
import Spinner from '@/components/icons/spinner';
const ArticleDetail = () => {
    const { id } = useParams();
    const { data, isLoading } = useArticleDetail(+id);

    return (
        <div className='px-4 py-8 md:px-28 bg-backgroundGrey flex-1'>
            {isLoading && <Spinner />}

            {!isLoading && (
                <>
                    <div className='relative w-full h-64 md:h-96 mb-6'>
                        <Image
                            src={CardImage}
                            alt='post'
                            layout='fill'
                            objectFit='contain'
                            className='rounded-lg'
                        />
                    </div>

                    <h1 className='text-3xl font-bold mb-4'>{data?.title}</h1>

                    <p className='text-sm text-gray-500 mb-4'>
                        <strong>By:</strong> {data?.creator?.name}{' '}
                        <span className='mx-2'>|</span>{' '}
                        <strong>Estimated Reading Time:</strong>{' '}
                        {data?.estimatedTime}
                    </p>

                    <div className='text-lg text-gray-700 text-justify tracking-wide'>
                        {data?.description}
                    </div>
                </>
            )}
        </div>
    );
};

export default ArticleDetail;
