const SearchResult = ({ stockList, addToWatchlist, watchlist }) => {
  const handleAddToWatchlist = (stock) => {
    if (
      stock.symbol &&
      !watchlist.some((item) => item.symbol === stock.symbol)
    ) {
      const updatedWatchlist = [...watchlist, stock];
      addToWatchlist((prevWatchlist) => updatedWatchlist);
      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    }
  };

  return (
    <div>
      <h3>Search Results:</h3>
      <ul>
        {stockList.map((stock, index) => (
          <li key={index}>
            {stock.symbol} - {stock.name} ({stock.type}, {stock.region})
            <button onClick={() => handleAddToWatchlist(stock)}>
              Add to Watchlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
