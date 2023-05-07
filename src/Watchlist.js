import React from "react";

const Watchlist = ({ watchlist, onStockRemove }) => {
  return (
    <div>
      <h2>Watchlist:</h2>
      <ul>
        {watchlist.map((stock, index) => (
          <li key={stock.symbol}>
            {stock.symbol} - {stock.name}
            <button onClick={() => onStockRemove(stock)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Watchlist;
