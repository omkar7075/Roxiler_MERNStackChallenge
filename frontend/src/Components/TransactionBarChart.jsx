
import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const TransactionBarChart = ({ selectedMonth }) => {
const [barChartData, setBarChartData] = useState([]);
useEffect(() => {
const fetchBarChartData = async () => {
try {
const response = await axios.get('https://roxiler-mernstackchallenge.onrender.com/api/bar-chart', { params: { month: selectedMonth } });
setBarChartData(response.data);
} catch (error) {
console.error('Error fetching bar chart data:', error);
}
};
fetchBarChartData();
}, [selectedMonth]);
return (
  <div>
    <h1>Barchart:</h1>
<BarChart
width={600}
height={300}
data={barChartData}
margin={{
top: 5, right: 30, left: 20, bottom: 5,
}}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="range" />
<YAxis />
<Tooltip />
<Legend />
<Bar dataKey="count" fill="#8884d8" />
</BarChart>
</div>
);
};
export default TransactionBarChart;
