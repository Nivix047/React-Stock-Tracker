import React, { useState } from "react";

const SearchBar = ({ onSearchTermChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchTermChange(event);
  };

  return (
    <div>
      <h2>Search Stocks:</h2>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
    </div>
  );
};

export default SearchBar;
