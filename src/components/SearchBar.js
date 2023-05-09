import React from "react";

// Search bar component
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  // Function to handle changes to search term input
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Return search bar JSX
  return (
    <div>
      <h2>Search Bar:</h2>
      <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
    </div>
  );
};

export default SearchBar;
