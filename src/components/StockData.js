import React from "react";

const StockData = ({ stockData }) => {
  if (!stockData) {
    return null;
  }

  const dataEntries = Object.entries(stockData);

  return (
    <div>
      <h2>Stock Data:</h2>
      {dataEntries.length > 0 && <h3>{dataEntries[0][1]}</h3>}
      <ul>
        {dataEntries.slice(1).map(([key, value]) => {
          const displayName = key.split(" ").slice(1).join(" ");
          return (
            <li key={key}>
              {displayName}: {value}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StockData;
