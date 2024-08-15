import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  setSearchTerm,
  clearSearchHistory,
} from '../../redux/slices/searchSlice';
import { useRouter } from 'next/router';

const SearchHistory: React.FC = () => {
  const searchHistory = useSelector(
    (state: RootState) => state.search.searchHistory
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
    router.push(`/?search=${term}`);
  };

  const handleClearHistory = () => {
    dispatch(clearSearchHistory());
  };

  return (
    <div className="search-history">
      <h4 className="font-bold mb-2">Recent Searches:</h4>
      <ul className="list-none p-0">
        {searchHistory.length > 0 ? (
          searchHistory.map((term, index) => (
            <li
              key={index}
              className="cursor-pointer text-blue-500 hover:underline mb-2"
              onClick={() => handleSearch(term)}
            >
              {term}
            </li>
          ))
        ) : (
          <li>No recent searches available.</li>
        )}
      </ul>
      {searchHistory.length > 0 && (
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleClearHistory}
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default SearchHistory;
