import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/searchSlice';

type SearchBarProps = {
  searchTerm: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm }) => {
  const [term, setTerm] = useState(searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = () => {
    dispatch(setSearchTerm(term));
  };

  return (
    <div className="flex mb-5">
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-4/5 p-2 border border-gray-300 rounded"
      />
      <button
        className="p-2 ml-2 text-white bg-blue-500 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
