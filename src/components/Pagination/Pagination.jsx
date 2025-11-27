
import React from 'react';
import ReactPaginate from 'react-paginate';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import './Pagination.css'; // Import the CSS file

const Pagination = ({ onPageChange, pageCount }) => {
  return (
    <ReactPaginate
      previousLabel={<BsChevronLeft />}
      nextLabel={<BsChevronRight />}
      breakLabel={'...'}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={'pagination'}
      pageClassName={'pagination-item'}
      pageLinkClassName={'pagination-link'}
      previousClassName={'pagination-item'}
      previousLinkClassName={'pagination-link pagination-link-previous'}
      nextClassName={'pagination-item'}
      nextLinkClassName={'pagination-link pagination-link-next'}
      breakClassName={'pagination-break'}
      activeClassName={'active'}
      disabledClassName={'disabled'}
    />
  );
};

export default Pagination;
