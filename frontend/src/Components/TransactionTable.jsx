
import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBox from './SearchBox';
import Pagination from './Pagination';
const TransactionTable = ({ selectedMonth }) => {
const [transactions, setTransactions] = useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [totalPages, setTotalPages] = useState(1);
const fetchTransactions = async (page, search) => {
try {
const response = await axios.get('https://roxiler-mernstackchallenge.onrender.com/api/transactions', {
params: {
month: selectedMonth,
page,
search
}
});
setTransactions(response.data.transactions);
setTotalPages(response.data.totalPages);
} catch (error) {
console.error('Error fetching transactions:', error);
}
};
useEffect(() => {
fetchTransactions(currentPage, searchQuery);
}, [selectedMonth, currentPage, searchQuery]);
return (
<div>
  <h1>Transaction Table</h1>
<SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
<table className='transaction'>
<thead>
<tr>
<th>Title</th>
<th>Description</th>
<th>Price</th>
<th>Date of Sale</th>
<th>Image</th>
</tr>
</thead>
<tbody>
{transactions.map((transaction) => (
<tr key={transaction._id}>
<td>{transaction.title}</td>
<td>{transaction.description}</td>
<td>{transaction.price}</td>
<td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
<td>
                  <img className='image'
                    src={transaction.image}
                    alt={transaction.title}
                    
                  />
</td>
</tr>
))}
</tbody>
</table>
<Pagination currentPage={currentPage} totalPages={totalPages}
setPage={setCurrentPage} />
</div>
);
};
export default TransactionTable;
