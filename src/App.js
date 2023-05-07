import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockList, setStockList] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [stockDetails, setStockDetails] = useState(null);

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

  const fetchStockDetails = async (symbol) => {
    try {
      const response = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: apiKey,
        },
      });

      if (response.status === 200) {
        setStockDetails(response.data["Global Quote"]);
      }
    } catch (err) {
      console.log(err.message);
    }
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
            {stock.symbol || ""} - {stock.name || ""}
            <button onClick={() => handleStockSelect(stock)}>Select</button>
            <button onClick={() => handleWatchlistAdd(stock)}>
              Add to Watchlist
            </button>
          </li>
        ))}
      </ul>

      {selectedStock && (
        <div>
          <h2>Selected Stock:</h2>
          <p>
            {selectedStock.symbol || ""} - {selectedStock.name || ""}
          </p>
          <button onClick={() => fetchStockDetails(selectedStock.symbol)}>
            Fetch Stock Details
          </button>
        </div>
      )}

      {stockDetails && (
        <div>
          <h2>Stock Details:</h2>
          <table>
            <tbody>
              {Object.entries(stockDetails).map(([key, value]) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2>Watchlist:</h2>
      <ul>
        {watchlist.map((stock, index) => (
          <li key={`${stock.symbol}-${index}`}>
            {stock.symbol || ""} - {stock.name || ""}
            <button onClick={() => handleWatchlistRemove(stock)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
