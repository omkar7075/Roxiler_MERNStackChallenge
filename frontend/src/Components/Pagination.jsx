
import '../App.css';
import React from 'react';
const Pagination = ({ currentPage, totalPages, setPage }) => {
return (
<div>
<button className='btn'
onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
Previous
</button>
<span>Page {currentPage} of {totalPages}</span>
<button className='btn'
onClick={() => setPage(currentPage + 1)} disabled={currentPage ===
totalPages}>
Next
</button>
</div>
);
};
export default Pagination;
