import React from "react";

const Watchlist = ({ watchlist, fetchStockData, removeFromWatchlist }) => {
  const handleClick = (symbol) => {
    fetchStockData(symbol);
  };

  const handleRemove = (symbol) => {
    removeFromWatchlist(symbol);
  };

  return (
    <div>
      <h3>Watchlist:</h3>
      <ul>
        {watchlist.map((stock, index) => (
          <li key={index}>
            {stock.symbol} - {stock.name} ({stock.type}, {stock.region})
            <button onClick={() => handleClick(stock.symbol)}>
              Fetch Data
            </button>
            <button onClick={() => handleRemove(stock.symbol)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
