import React from "react";

// Watchlist component
const Watchlist = ({ watchlist, removeFromWatchlist, setSelectedSymbol }) => {
  // Return watchlist JSX
  return (
    <div>
      <h2>Watchlist</h2>
      <ul>
        {watchlist.map((stock) => (
          <li
            key={stock["1. symbol"]}
            onClick={() => setSelectedSymbol(stock["1. symbol"])}
          >
            {stock["2. name"]} ({stock["1. symbol"]})
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFromWatchlist(stock["1. symbol"]);
              }}
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
