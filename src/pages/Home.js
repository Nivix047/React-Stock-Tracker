import React, { useState, useEffect } from "react";
import SearchResult from "../components/SearchResult";
import Watchlist from "../components/Watchlist";
import StockDetails from "../components/StockDetails";

// Home component
const Home = () => {
  // Declare state variables
  const [searchResults, setSearchResults] = useState([]);
  const [watchlist, setWatchlist] = useState(
    JSON.parse(localStorage.getItem("watchlist")) || []
  );
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [stockDataFetched, setStockDataFetched] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Save watchlist to local storage when it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Add stock to watchlist
  const addToWatchlist = (stock) => {
    const stockToAdd = {
      "1. symbol": stock["1. symbol"],
      "2. name": stock["2. name"],
    };

    if (
      !watchlist.some((item) => item["1. symbol"] === stockToAdd["1. symbol"])
    ) {
      setWatchlist([...watchlist, stockToAdd]);
    }
  };

  // Remove stock from watchlist
  const removeFromWatchlist = (symbol) => {
    setWatchlist(watchlist.filter((stock) => stock["1. symbol"] !== symbol));
  };

  // Search for stocks based on search term
  const searchStocks = async (searchTerm) => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setSearchError(null);
    } else {
      const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;
      const response = await fetch(
        `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${API_KEY}`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.bestMatches || []);
        setSearchError(null);
      } else {
        setSearchResults([]);
        setSearchError("Failed to fetch search results. Please try again.");
      }
    }
  };

  // Close stock details
  const closeStockDetails = () => {
    setSelectedSymbol(null);
    setStockDataFetched(false);
  };

  // Return home JSX
  return (
    <div>
      <h1>Stock App</h1>
      <div>
        <label htmlFor="search">Search stocks:</label>
        <input
          type="text"
          id="search"
          name="search"
          onChange={(e) => searchStocks(e.target.value)}
        />
      </div>
      {searchError && <p style={{ color: "red" }}>{searchError}</p>}
      <SearchResult
        searchResults={searchResults}
        addToWatchlist={addToWatchlist}
        setSelectedSymbol={setSelectedSymbol}
      />
      <Watchlist
        watchlist={watchlist}
        removeFromWatchlist={removeFromWatchlist}
        setSelectedSymbol={setSelectedSymbol}
      />
      {selectedSymbol && (
        <StockDetails
          symbol={selectedSymbol}
          setStockDataFetched={setStockDataFetched}
        />
      )}
      {stockDataFetched && <button onClick={closeStockDetails}>Close</button>}
    </div>
  );
};

export default Home;
