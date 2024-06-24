# Transactions Management Application

This project is a full-stack application for managing transactions. It includes both frontend and backend components to provide a user interface for viewing and managing transactions, displaying statistics, and viewing bar charts.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Backend API](#backend-api)
  - [Get Transactions](#get-transactions)
  - [Get Transaction Statistics](#get-transaction-statistics)
  - [Get Bar Chart Data](#get-bar-chart-data)
- [Frontend Components](#frontend-components)
  - [MonthDropdown](#monthdropdown)
  - [SearchBox](#searchbox)
  - [Pagination](#pagination)
  - [TransactionTable](#transactiontable)
  - [TransactionStatistics](#transactionstatistics)
  - [TransactionBarChart](#transactionbarchart)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js
- npm or yarn
- MongoDB

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/transactions-management.git
cd backend
npm install
cd ../frontend
npm install

PORT=5000
MONGO_URI=your_mongodb_connection_string

REACT_APP_API_URL=http://localhost:5000/api

cd backend
npm start

cd ../frontend
npm start


#Backend API
