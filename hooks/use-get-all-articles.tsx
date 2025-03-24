"use client";
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE } from "@/constants";
import { ROUTE_QUERY_KEYS } from "@/constants/routes";
import { getClient } from "@/utils/client";
import { useQuery } from "@tanstack/react-query";

const useGetAllArticles = ({
  page,
  limit,
}: { page?: number; limit?: number } = {}) => {
  const pageNumber = page ?? PAGINATION_DEFAULT_PAGE;
  const limitNumber = limit ?? PAGINATION_DEFAULT_LIMIT;

  return useQuery<GetAllArticlesResponse>({
    queryKey: [ROUTE_QUERY_KEYS.GET_ALL_ARTICLES, pageNumber, limitNumber], // Include pagination params in query key
    queryFn: () => getArticles(pageNumber, limitNumber),
    throwOnError: true,
  });
};

// Extract query function to avoid unnecessary re-renders
const getArticles = async (page: number, limit: number) => {
  const result = await getClient(`article/all?page=${page}&limit=${limit}`);
  return result;
};

export default useGetAllArticles;
