import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/searchSlice';
import { RootState } from '../../redux/store';
import './SearchBar.css';

type SearchBarProps = {
  searchTerm: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm }) => {
  const [term, setTerm] = useState(searchTerm);
  const dispatch = useDispatch();
  const storedTerm = useSelector((state: RootState) => state.search.searchTerm);

  useEffect(() => {
    if (searchTerm) {
      setTerm(searchTerm);
    } else {
      setTerm(storedTerm);
    }
  }, [storedTerm, searchTerm]);

  const handleSearch = () => {
    dispatch(setSearchTerm(term));
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
