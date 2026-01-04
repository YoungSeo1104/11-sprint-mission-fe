import React from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const MAX_BUTTONS = 5;

  // 현재 페이지가 속한 그룹 (0부터 시작)
  const currentGroup = Math.floor((currentPage - 1) / MAX_BUTTONS);

  const startPage = currentGroup * MAX_BUTTONS + 1;
  const endPage = Math.min(startPage + MAX_BUTTONS - 1, totalPages);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  return (
    <div className={styles.pagination}>
      <button onClick={() => onPageChange(startPage - 1)}>{'<'}</button>

      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={clsx(
            styles.pageButton,
            currentPage === pageNumber && styles.active,
          )}
        >
          {pageNumber}
        </button>
      ))}
      <button onClick={() => onPageChange(endPage + 1)}>{'>'}</button>
    </div>
  );
};

export default Pagination;
