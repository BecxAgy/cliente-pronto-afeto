'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/src/shared/modules/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export function PaginationComponent({
  currentPage,
  totalPages,
  searchParams,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      navigateToPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      navigateToPage(currentPage + 1);
    }
  };

  // Gera array de páginas para exibir
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Se tiver poucas páginas, mostra todas
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sempre mostra primeira página
      pages.push(0);

      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages - 2, currentPage + 1);

      // Ajusta se estiver no início
      if (currentPage <= 2) {
        endPage = 3;
      }

      // Ajusta se estiver no final
      if (currentPage >= totalPages - 3) {
        startPage = totalPages - 4;
      }

      // Adiciona ellipsis no início se necessário
      if (startPage > 1) {
        pages.push('ellipsis');
      }

      // Adiciona páginas do meio
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Adiciona ellipsis no final se necessário
      if (endPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Sempre mostra última página
      pages.push(totalPages - 1);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size={'sm'}
            onClick={handlePrevious}
            className={
              currentPage === 0
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>

        {getPageNumbers().map((pageNum, index) => {
          if (pageNum === 'ellipsis') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNum}>
              <PaginationLink
                size={'sm'}
                onClick={() => navigateToPage(pageNum)}
                isActive={pageNum === currentPage}
                className="cursor-pointer"
              >
                {pageNum + 1}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            size={'sm'}
            onClick={handleNext}
            className={
              currentPage === totalPages - 1
                ? 'pointer-events-none opacity-50'
                : 'cursor-pointer'
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
