import React from 'react';
import { PaginationProps } from '../types';
import './Pagination.css';

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPages = () => {
    const pagesToShow = 3;
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        {'<<'}
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        {'<'}
      </button>
      {renderPages().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={
            pageNumber === currentPage
              ? 'active pagination-button'
              : 'pagination-button'
          }
        >
          {pageNumber}
        </button>
      ))}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        {'>'}
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        {'>>'}
      </button>
    </div>
  );
};

export default Pagination;
