import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/searchSlice';
import { RootState } from '../../redux/store';

type SearchBarProps = {
  searchTerm: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm }) => {
  const [term, setTerm] = useState(searchTerm);
  const dispatch = useDispatch();
  const storedTerm = useSelector((state: RootState) => state.search.searchTerm);

  useEffect(() => {
    setTerm(storedTerm);
  }, [storedTerm]);

  const handleSearch = () => {
    dispatch(setSearchTerm(term));
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
