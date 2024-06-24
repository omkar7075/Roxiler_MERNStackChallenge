
/*
import React from 'react';
const Pagination = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-4">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          currentPage === totalPages ? 'bg-red-200 text-gray-500 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
*/
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