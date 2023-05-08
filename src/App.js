import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockList, setStockList] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [stockData, setStockData] = useState(null);

  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const fetchStockData = async (symbol) => {
    try {
      const response = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: apiKey,
        },
      });

      if (response.status === 200) {
        setStockData(response.data["Global Quote"]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter((stock) => stock.symbol !== symbol));
  };

  useEffect(() => {
    const fetchStockList = async () => {
      try {
        const response = await axios.get("https://www.alphavantage.co/query", {
          params: {
            function: "SYMBOL_SEARCH",
            keywords: searchTerm,
            apikey: apiKey,
          },
        });

        if (response.status === 200) {
          setStockList(
            response.data.bestMatches
              ? response.data.bestMatches.map((match) => ({
                  symbol: match["1. symbol"] || "",
                  name: match["2. name"] || "",
                  type: match["3. type"] || "",
                  region: match["4. region"] || "",
                }))
              : []
          );
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    if (searchTerm) {
      fetchStockList();
    }
  }, [searchTerm, apiKey]);

  return (
    <div>
      <h2>Search Bar:</h2>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />

      <h2>Search Results:</h2>
      <ul>
        {stockList.map((stock, index) => (
          <li key={`${stock.symbol}-${index}`}>
            {stock.symbol} - {stock.name}
            <button onClick={() => setWatchlist([...watchlist, stock])}>
              Add to Watchlist
            </button>
          </li>
        ))}
      </ul>

      <h2>Watchlist:</h2>
      <ul>
        {watchlist.map((stock, index) => (
          <li key={`${stock.symbol}-${index}`}>
            {stock.symbol} - {stock.name}
            <button onClick={() => fetchStockData(stock.symbol)}>
              Fetch Stock Data
            </button>
            <button onClick={() => removeFromWatchlist(stock.symbol)}>
              Remove from Watchlist
            </button>
          </li>
        ))}
      </ul>

      {stockData && (
        <div>
          <h2>Stock Data:</h2>
          <ul>
            {Object.keys(stockData).map((key, index) => (
              <li key={index}>
                {key}: {stockData[key]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
