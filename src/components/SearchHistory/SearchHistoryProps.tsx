import React from 'react';

type SearchHistoryProps = {
  searchHistory: string[];
  onSearch: (term: string) => void;
};

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  onSearch,
}) => {
  return (
    <div className="search-history">
      <h4>Recent Searches:</h4>
      <ul>
        {searchHistory.map((term, index) => (
          <li key={index} onClick={() => onSearch(term)}>
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchHistory;
