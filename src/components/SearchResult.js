import React from "react";

// Search results component
const SearchResult = ({ searchResults, addToWatchlist, setSelectedSymbol }) => {
  // Return search results JSX
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((result) => (
          <li
            key={result["1. symbol"]}
            onClick={() => setSelectedSymbol(result["1. symbol"])}
          >
            {result["2. name"]} ({result["1. symbol"]})
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToWatchlist(result);
              }}
            >
              +
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;
