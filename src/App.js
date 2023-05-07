import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [watchlist, setWatchlist] = useState([]);

  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
  };

  const handleWatchlistAdd = () => {
    if (!watchlist.some((s) => s.symbol === selectedStock.symbol)) {
      setWatchlist([...watchlist, selectedStock]);
    }
  };

  const handleWatchlistRemove = (stockToRemove) => {
    setWatchlist(
      watchlist.filter((stock) => stock.symbol !== stockToRemove.symbol)
    );
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
          <li
            key={`${stock.symbol}-${index}`}
            onClick={() => handleStockSelect(stock)}
          >
            {stock.symbol || ""} - {stock.name || ""} - {stock.type || ""} -{" "}
            {stock.region || ""}
          </li>
        ))}
      </ul>

      {selectedStock && (
        <div>
          <h2>Selected Stock:</h2>
          <p>
            {selectedStock.symbol || ""} - {selectedStock.name || ""} -{" "}
            {selectedStock.type || ""} - {selectedStock.region || ""}
          </p>
          <button onClick={handleWatchlistAdd}>Add to Watchlist</button>
        </div>
      )}

      <h2>Watchlist:</h2>
      <ul>
        {watchlist.map((stock, index) => (
          <li
            key={`${stock.symbol}-${index}`}
            onClick={() => handleWatchlistRemove(stock)}
          >
            {stock.symbol || ""} - {stock.name || ""} - {stock.type || ""} -{" "}
            {stock.region || ""}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
