"use client"
import Link from 'next/link'
import React from 'react'
import usePagination from '@/hooks/usePagination'

export type PaginationProps = {
  totalItems: number
  currentPage: number 
  isButton: boolean
  renderPageLink: (page: number, limit: number) => string
  itemsPerPage?: number
  setPage: (value: any) => void
}

export const dotts = '...'

const Pagination = ({
  totalItems,
  currentPage,
  isButton = false,
  itemsPerPage = 10,
  renderPageLink,
  setPage,
}: PaginationProps) => {
  const pages = usePagination(totalItems, currentPage, itemsPerPage)

  return (
    <div className="flex items-center justify-center my-8">
      {pages.map((pageNumber, i) =>
        pageNumber === dotts ? (
          <span
            key={i}
            className="px-4 py-2 rounded-full text-sm font-semibold text-black"
          >
            {pageNumber}
          </span>
        ) : (
          isButton == true ? <button key={i}
          onClick={setPage}
          className={`${
            pageNumber === currentPage ? 'text-success-dark' : 'text-black'
          } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
        >
          {pageNumber}
        </button> : 
          <Link
            key={i}
            href={renderPageLink(pageNumber as number, itemsPerPage)}
            className={`${
              pageNumber === currentPage ? 'text-success-dark' : 'text-black'
            } px-4 py-2 mx-1 rounded-full text-sm font-semibold no-underline`}
          >
            {pageNumber}
          </Link>
          
        )
      )}
    </div>
  )
}

export default Pagination