import { CustomLink } from "@/data/types";
import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";

const DEMO_PAGINATION: CustomLink[] = [
  {
    label: "1",
    href: "/",
  },
  {
    label: "2",
    href: "/",
  },
  {
    label: "3",
    href: "/",
  },
  {
    label: "4",
    href: "/",
  },
];

export interface PaginationProps {
  className?: string;
  onPageChange?: (page: number) => void; // Add this
}


const Pagination: FC<PaginationProps> = ({ className = "", onPageChange }) => {
  const renderItem = (pag: CustomLink, index: number) => {
    const handlePageChange = () => {
      if (onPageChange) {
        onPageChange(Number(pag.label)); // Notify parent of the selected page
      }
    };

    // console.log(index, 'pag!');

    // if (index === 0) {
    //   return (
    //     <span
    //       key={index}
    //       className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
    //     >
    //       {pag.label}
    //     </span>
    //   );
    // }
    return (
      <span
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
        onClick={handlePageChange} // Trigger the callback
      >
        {pag.label}
      </span>
    );
  };

  
  return (
    <nav
    className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
  >
    {DEMO_PAGINATION.map(renderItem)}
  </nav>
  );
};

export default Pagination;
