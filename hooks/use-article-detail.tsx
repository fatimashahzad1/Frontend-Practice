"use client";
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE } from "@/constants";
import { getClient } from "@/utils/client";
import { useQuery } from "@tanstack/react-query";

const useArticleDetail = (id: number) => {
  return useQuery<Article>({
    queryKey: ["article-detail", id], // Include pagination params in query key
    queryFn: () => getArticleDetail(id),
  });
};

// Extract query function to avoid unnecessary re-renders
const getArticleDetail = async (id: number) => {
  const result = await getClient(`article/${id}`);

  if (result?.error) {
    throw new Error(result?.message || "Failed to fetch article");
  }

  return result;
};

export default useArticleDetail;
