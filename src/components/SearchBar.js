import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>Search Bar:</h2>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
    </div>
  );
};

export default SearchBar;
