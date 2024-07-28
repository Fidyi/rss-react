import React, { useState, useEffect } from 'react';

type SearchBarProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  const [term, setTerm] = useState(searchTerm);

  useEffect(() => {
    const storedTerm = localStorage.getItem('searchTerm');
    if (storedTerm) {
      setTerm(storedTerm);
    }
  }, []);

  const handleSearch = () => {
    localStorage.setItem('searchTerm', term);
    onSearch(term);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
