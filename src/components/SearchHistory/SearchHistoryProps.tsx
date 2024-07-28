import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setSearchTerm } from '../../redux/slices/searchSlice';

const SearchHistory: React.FC = () => {
  const searchHistory = useSelector(
    (state: RootState) => state.search.searchHistory
  );
  const dispatch = useDispatch();

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
  };

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
