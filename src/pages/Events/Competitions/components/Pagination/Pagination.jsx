import React from 'react';
import './Pagination.css';

const Pagination = ({ totalPageCount, currentPage, setCurrentPage }) => {
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
    return (
        totalPageCount && totalPageCount > 1 ? 
        <div className="pagination">
            {[...Array(totalPageCount)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => paginate(i + 1)}
                    className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
                >
                    {i + 1}
                </button>
            ))}
        </div> : <></>
    );
};

export default Pagination;
