
import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const TransactionStatistics = ({ selectedMonth }) => {
const [statistics, setStatistics] = useState({
totalSaleAmount: 0,
totalSoldItems: 0,
totalNotSoldItems: 0
});
useEffect(() => {
const fetchStatistics = async () => {
try {
const response = await axios.get('http://localhost:5000/api/statistics', { params: { month: selectedMonth } });
setStatistics(response.data);
} catch (error) {
console.error('Error fetching statistics:', error);
}
};
fetchStatistics();
}, [selectedMonth]);
return (
<div className='statistics'>
  <h1>Statistics:</h1>
<div>Total Sale Amount: {statistics.totalSaleAmount}</div>
<div>Total Sold Items: {statistics.totalSoldItems}</div>
<div>Total Not Sold Items: {statistics.totalNotSoldItems}</div>
</div>
);
};
export default TransactionStatistics;