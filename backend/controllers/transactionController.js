require('dotenv').config();
const axios = require('axios');
const Transaction = require('../models/transaction');
const PORT = process.env.PORT || 5000;

const getMonthDateRange = (month) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = months.indexOf(month);
    if (monthIndex === -1) {
        throw new Error('Invalid month');
    }
    const start = new Date(2000, monthIndex, 1);
    const end = new Date(2000, monthIndex + 1, 0, 23, 59, 59, 999); 
    return { start, end };
};

exports.initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;
        
        await Transaction.deleteMany({});
        await Transaction.insertMany(transactions);
        
        res.status(200).json({ message: 'Database initialized with seed data' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.listTransactions = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const search = req.query.search || '';
    
        const query = {};
    
        if (search) {
          const searchRegex = new RegExp(search, 'i');
          const searchPrice = parseFloat(search);
    
          query.$or = [
            { title: { $regex: searchRegex } }, 
            { description: { $regex: searchRegex } },
          ];
    
          if (!isNaN(searchPrice)) {
            query.$or.push({ price: searchPrice });
          }
        }
        const totalItems = await Transaction.countDocuments(query);
        const transactions = await Transaction.find(query)
          .skip((page - 1) * perPage)
          .limit(perPage)
          .exec();
    
        res.json({
          transactions,
          currentPage: page,
          perPage: perPage,
          totalPages: Math.ceil(totalItems / perPage),
          totalItems
        });
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).send('Server Error');
      }
};






exports.getStatistics = async (req, res) => {
  try {
    const month = req.query.month;

    
    if (!isValidMonth(month)) {
      return res.status(400).json({ msg: 'Invalid month. Please provide a valid month.' });
    }

   
    const monthNumber = new Date(`${month} 1`).getMonth() + 1;

    
    const totalSaleAmount = await Transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber]
          },
          sold: true
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$price" }
        }
      }
    ]);

   
    const totalSoldItems = await Transaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber]
      },
      sold: true
    });

    
    const totalNotSoldItems = await Transaction.countDocuments({
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, monthNumber]
      },
      sold: false
    });

    const finalTotalSalesAmount = totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0

    res.json({
      totalSaleAmount: finalTotalSalesAmount.toFixed(2),
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (error) {
    console.error('Error fetching statistics:', error.message);
    res.status(500).send('Server Error');
  }
};




const validMonths = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const isValidMonth = (month) => validMonths.includes(month);
  
  
exports.getBarChartData = async (req, res) => {
    const month = req.query.month; 
  
    if (!isValidMonth(month)) {
      return res.status(400).json({ error: 'Invalid month' });
    }
  
    const monthIndex = validMonths.indexOf(month) + 1; 
  console.log(monthIndex);
    try {
      const results = await Transaction.aggregate([
        {
          $match: {
            $expr: {
              $eq: [{ $month: "$dateOfSale" }, monthIndex]
            }
          }
        },
        {
          $group: {
            _id: null,
            '0 - 100': {
              $sum: {
                $cond: [{ $lte: ["$price", 100] }, 1, 0]
              }
            },
            '101 - 200': {
              $sum: {
                $cond: [{ $and: [{ $gt: ["$price", 100] }, { $lte: ["$price", 200] }] }, 1, 0]
              }
            },
            '201 - 300': {
              $sum: {
                $cond: [{ $and: [{ $gt: ["$price", 200] }, { $lte: ["$price", 300] }] }, 1, 0]
              }
            },
            '301 - 400': {
              $sum: {
                $cond: [{ $and: [{ $gt: ["$price", 300] }, { $lte: ["$price", 400] }] }, 1, 0]
              }
            },
            '401 - 500': {
              $sum: {
                $cond: [{ $and: [{ $gt: ["$price", 400] }, { $lte: ["$price", 500] }] }, 1, 0]
              }
            },
            '501 - 600': {
              $sum: {
                $cond: [{ $and: [{ $gt: ["$price", 500] }, { $lte: ["$price", 600] }] }, 1, 0]
              }
            },
            '601 - 700': {
              $sum: {
                $cond: [{ $and: [{ $gt: ["$price", 600] }, { $lte: ["$price", 700] }] }, 1, 0]
              }
            },
            '701 - 800': {
              $sum: {
                $cond: [{ $and: [{ $gt: ["$price", 700] }, { $lte: ["$price", 800] }] }, 1, 0]
              }
            },
            '801 - 900': {
              $sum: {
                $cond: [{ $and: [{ $gt: ["$price", 800] }, { $lte: ["$price", 900] }] }, 1, 0]
              }
            },
            '901 - above': {
              $sum: {
                $cond: [{ $gt: ["$price", 900] }, 1, 0]
              }
            }
          }
        },
        {
          $project: {
            _id: 0, 
            range: { $objectToArray: "$$ROOT" } 
          }
        },
        {
          $unwind: "$range" 
        },
        {
          $match: {
            "range.k": { $ne: "_id" } 
          }
        },
        {
          $project: {
            range: "$range.k",
            count: "$range.v"
          }
        }
      ]);
  
      
  
      res.json(results);
    } catch (error) {
      console.error("Error during aggregation:", error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


exports.getPieChartData = async (req, res) => {
        const month = req.query.month; 
      
        
        if (!isValidMonth(month)) {
          return res.status(400).json({ error: 'Invalid month' });
        }
      
        
        const monthIndex = validMonths.indexOf(month) + 1;
      
        try {
        
          const results = await Transaction.aggregate([
            {
              $match: {
                $expr: {
                  $eq: [{ $month: "$dateOfSale" }, monthIndex]
                }
              }
            },
            {
              $group: {
                _id: "$category",
                count: { $sum: 1 }
              }
            },
            {
              $project: {
                category: "$_id",
                count: 1,
                _id: 0
              }
            }
          ]);
      
        
          const formattedResults = results.map(item => ({
            category: item.category,
            count: item.count
          }));
      
          console.log("Pie Chart Results:", formattedResults);
      
          res.json(formattedResults);
        } catch (error) {
          console.error("Error fetching pie chart data:", error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };



      exports.getCombinedData = async (req, res) => {
        try {
        
          const { month, page, perPage, search } = req.query;
      
          
          const [transactionsResponse, statisticsResponse, barChartResponse] = await Promise.all([
            axios.get(`http://localhost:${PORT}/api/transactions`, {
              params: { page, perPage, search }
            }),
            axios.get(`http://localhost:${PORT}/api/statistics`, {
              params: { month }
            }),
            axios.get(`http://localhost:${PORT}/api/bar-chart`, {
              params: { month }
            })
          ]);
      
      
          const combinedData = {
            transactions: transactionsResponse.data,
            statistics: statisticsResponse.data,
            barChart: barChartResponse.data
          };
      
       
          res.json(combinedData);
        } catch (error) {
          console.error('Error fetching combined data:', error);
          res.status(500).json({ error: 'Error' });
        }
      };