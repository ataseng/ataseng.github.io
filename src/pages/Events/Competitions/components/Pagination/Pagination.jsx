import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, currentPage, paginate }) => {
    return (
        <div className="pagination">
            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
