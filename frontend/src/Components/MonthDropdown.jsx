
import '../App.css';
import React from 'react';
const months = [
'January', 'February', 'March', 'April', 'May', 'June',
'July', 'August', 'September', 'October', 'November', 'December'
];
const MonthDropdown = ({ selectedMonth, setSelectedMonth }) => {
return (
<select className='monthdrop dropdown'
value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
{months.map((month, index) => (
<option className='dropdown-content'
  key={index} value={month}>
{month}
</option>
))}
</select>
);
};
export default MonthDropdown;