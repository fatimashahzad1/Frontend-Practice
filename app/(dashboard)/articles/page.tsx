"use client";
import PaginationCustom from "@/components/dashboard/pagination";
import { PeopleCard } from "@/components/dashboard/people/people-card";
import Spinner from "@/components/icons/spinner";
import { ShieldOff } from "lucide-react";
import { PAGINATION_DEFAULT_LIMIT, PAGINATION_DEFAULT_PAGE } from "@/constants";
import useGetAllArticles from "@/hooks/use-get-all-articles";
import { useSearchParams } from "next/navigation";
import React from "react";

const Articles = () => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || PAGINATION_DEFAULT_PAGE;
  const limit = Number(searchParams.get("limit")) || PAGINATION_DEFAULT_LIMIT;

  const { data, isPending } = useGetAllArticles({ page, limit });
  const pagesPerPage = Math.ceil((data?.pagination?.total_count ?? 0) / limit);

  const getDescription = (article: Article) => {
    return [
      article.creator.name,
      article?.estimatedTime ? `Est. Time: ${article.estimatedTime}` : "",
    ]
      .filter(Boolean)
      .join(" | ");
  };

  return (
    <div className="bg-backgroundGrey flex flex-col justify-between items-stretch flex-1">
      {isPending && <Spinner />}
      {data?.articles?.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-2 pt-8 ">
          <ShieldOff className="h-4 w-4 text-red " />
          <p className="text-center">No Articles available</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-8 justify-center items-center gap-6">
          {data?.articles?.map((article, index) => (
            <PeopleCard
              key={index}
              title={article.title}
              description={getDescription(article)}
              actionTitle={"Read"}
              actionButtonClasses={
                "border-primaryBlue text-primaryBlue hover:text-primaryBlue"
              }
              action={() => {}}
              actionDisabled={false}
            />
          ))}
        </div>
      )}

      <PaginationCustom totalPages={pagesPerPage} />
    </div>
  );
};

export default Articles;
