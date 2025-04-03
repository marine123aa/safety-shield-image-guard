
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // Add first page
  pages.push(1);
  
  // Add current page and pages around it
  for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
    if (pages[pages.length - 1] !== i - 1) {
      pages.push(-1); // -1 represents ellipsis
    }
    pages.push(i);
  }
  
  // Add last page
  if (totalPages > 1) {
    if (pages[pages.length - 1] !== totalPages - 1) {
      pages.push(-1); // -1 represents ellipsis
    }
    pages.push(totalPages);
  }
  
  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        &lt;
      </button>
      
      {pages.map((page, index) => (
        <React.Fragment key={index}>
          {page === -1 ? (
            <span className="px-3 py-1">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-blue text-white'
                  : 'border hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
