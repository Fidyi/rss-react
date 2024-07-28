import React, { useState, useEffect } from 'react';
import './SearchBar.css';

type SearchBarProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm: initialSearchTerm,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState(initialSearchTerm);

  useEffect(() => {
    setInputValue(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(inputValue.trim());
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
    </div>
  );
};

export default SearchBar;
