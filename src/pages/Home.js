import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import SearchResult from "../components/SearchResult";
import Watchlist from "../components/Watchlist";
import StockData from "../components/StockData";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockList, setStockList] = useState([]);
  const [watchlist, setWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist
      ? JSON.parse(storedWatchlist).filter((stock) => stock.symbol)
      : [];
  });

  const [stockData, setStockData] = useState(null);

  const apiKey = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

  const fetchStockData = async (symbol) => {
    try {
      const response = await axios.get("https://www.alphavantage.co/query", {
        params: {
          function: "GLOBAL_QUOTE",
          symbol: symbol,
          apikey: apiKey,
        },
      });

      console.log("Stock data API response:", response);

      if (response.status === 200) {
        setStockData(response.data["Global Quote"]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const removeFromWatchlist = (symbol) => {
    setWatchlist((prevWatchlist) => {
      const updatedWatchlist = prevWatchlist.filter(
        (stock) => stock.symbol !== symbol
      );
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
      return updatedWatchlist;
    });
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

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <div>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <SearchResult
        stockList={stockList}
        addToWatchlist={setWatchlist}
        watchlist={watchlist}
      />
      <Watchlist
        watchlist={watchlist}
        fetchStockData={fetchStockData}
        removeFromWatchlist={removeFromWatchlist}
      />
      <StockData stockData={stockData} />
    </div>
  );
};

export default Home;
