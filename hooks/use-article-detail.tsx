'use client';
import { getClient } from '@/utils/client';
import { useQuery } from '@tanstack/react-query';

const useArticleDetail = (id: number) => {
  return useQuery<Article>({
    queryKey: ['article-detail', id], // Include pagination params in query key
    queryFn: () => getArticleDetail(id),
    throwOnError: true,
  });
};

// Extract query function to avoid unnecessary re-renders
const getArticleDetail = async (id: number) => {
  const result = await getClient(`article/${id}`);
  return result;
};

export default useArticleDetail;
