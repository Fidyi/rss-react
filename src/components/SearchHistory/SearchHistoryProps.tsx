import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSearchTerm } from '../../redux/slices/searchSlice';

const SearchHistory: React.FC = () => {
  const searchHistoryFromStore = useSelector(
    (state: RootState) => state.search.searchHistory
  );
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchHistory(searchHistoryFromStore);
  }, [searchHistoryFromStore]);

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  if (!searchHistory.length) {
    return <div className="search-history">No recent searches available.</div>;
  }

  return (
    <div className="search-history">
      <h4>Recent Searches:</h4>
      <ul>
        {searchHistory
          .filter((term) => term.trim() !== '')
          .map((term, index) => (
            <li key={index} onClick={() => handleSearch(term)}>
              {term}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
