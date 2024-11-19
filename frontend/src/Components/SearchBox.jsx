
import '../App.css';
import React from 'react';
const SearchBox = ({ searchQuery, setSearchQuery }) => {
return (
<input className='search-box'
type="text"
placeholder="Search transactions"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
/>
);
};
export default SearchBox;
