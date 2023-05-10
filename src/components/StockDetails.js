import React, { useState, useEffect } from "react";
import { Chart } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
} from "chart.js";

// Register required chart components with Chart.js library
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController
);

// StockDetails component
const StockDetails = ({ symbol, setStockDataFetched }) => {
  // Declare state variables
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch stock data when symbol changes
  useEffect(() => {
    if (symbol) {
      fetchData(symbol);
      setStockDataFetched(true);
    }
  }, [symbol, setStockDataFetched]);

  // Fetch stock data from API
  const fetchData = async (symbol) => {
    console.log(`Fetching data for ${symbol}`);

    const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`
    );
    if (response.ok) {
      const data = await response.json();
      setStockData(data["Time Series (Daily)"]);
      setError(null);
    } else {
      setStockData(null);
      setError("Failed to fetch stock data. Please try again.");
    }
  };

  // Display loading message or error message if stock data is not yet fetched
  if (!stockData) {
    return (
      <div>
        {error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <p>Loading stock data ...</p>
        )}
      </div>
    );
  }

  // Get entries from stock data object and format data for chart
  const dataEntries = Object.entries(stockData);
  dataEntries.reverse();
  const slicedEntries = dataEntries.slice(-30);

  const chartData = {
    labels: slicedEntries.map(([date]) => date),
    datasets: [
      {
        label: "Adjusted Close",
        data: slicedEntries.map(
          ([, stockInfo]) => stockInfo["5. adjusted close"]
        ),
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Define responsive options
  const responsiveOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  // Return stock details JSX with chart
  return (
    <div>
      <h2>Stock Details</h2>
      <div style={{ maxWidth: "100%", height: "300px" }}>
        <Line data={chartData} options={responsiveOptions} />
      </div>
    </div>
  );
};

export default StockDetails;
