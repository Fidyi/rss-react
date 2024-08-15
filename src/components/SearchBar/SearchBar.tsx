import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/slices/searchSlice';

type SearchBarProps = {
  searchTerm?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm = '' }) => {
  const [term, setTerm] = useState(searchTerm);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setTerm(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      dispatch(setSearchTerm(term.trim()));
      router.push(`/?search=${term.trim()}`);
    } else {
      router.push('/');
    }
  };

  return (
    <form className="flex mb-5" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="w-4/5 p-2 border border-gray-300 rounded"
      />
      <button type="submit" className="p-2 ml-2 text-white bg-blue-500 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
