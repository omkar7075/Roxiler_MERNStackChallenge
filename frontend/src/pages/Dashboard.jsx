
import '../App.css';
import React, { useState } from 'react';
import MonthDropdown from '../Components/MonthDropdown';
import TransactionTable from '../Components/TransactionTable';
import TransactionStatistics from '../Components/TransactionStatistics';
import TransactionBarChart from '../Components/TransactionBarChart';
import TransactionPieChart from '../Components/TransactionPieChart';
const Dashboard = () => {
const [selectedMonth, setSelectedMonth] = useState('March');
return (
<div>
<h1>Dashboard</h1>

<TransactionStatistics selectedMonth={selectedMonth} />
<MonthDropdown selectedMonth={selectedMonth}
setSelectedMonth={setSelectedMonth} />
<TransactionTable selectedMonth={selectedMonth} />
<TransactionBarChart selectedMonth={selectedMonth} />
<TransactionPieChart selectedMonth={selectedMonth} />

</div>
);
};
export default Dashboard;
