import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import { SearchBarProps } from '../types';

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm: initialSearchTerm,
  onSearch,
  searchHistory,
}) => {
  const [inputValue, setInputValue] = useState(initialSearchTerm);

  useEffect(() => {
    setInputValue(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearch}>Search</button>
      {searchHistory.length > 1 && (
        <div className="recent-searches">
          <h4>Recent Searches:</h4>
          <ul>
            {searchHistory.slice(1).map((term, index) => (
              <li key={index} onClick={() => onSearch(term)}>
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
