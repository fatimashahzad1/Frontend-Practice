'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const PaginationCustom = ({ totalPages = 10 }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = Number(searchParams.get('page')) || 1;

  // Function to update the URL query parameter
  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`?${params.toString()}`);
  };

  const disabledClasses = 'cursor-not-allowed opacity-50';

  if (totalPages > 0) {
    return (
      <Pagination className="my-2">
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) updatePage(currentPage - 1);
              }}
              className={currentPage === 1 ? disabledClasses : 'cursor-pointer'}
            />
          </PaginationItem>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  isActive={currentPage === pageNumber}
                  onClick={(e) => {
                    e.preventDefault();
                    updatePage(pageNumber);
                  }}
                  className="cursor-pointer"
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          {/* Ellipsis (Shown if total pages are large) */}
          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) updatePage(currentPage + 1);
              }}
              className={
                currentPage === totalPages ? disabledClasses : 'cursor-pointer'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  }
};

export default PaginationCustom;
