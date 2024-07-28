import { useState, useEffect } from 'react';

const useSearchQuery = (initialQuery: string) => {
  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    const storedHistory = localStorage.getItem('searchHistory');
    const parsedHistory = storedHistory ? JSON.parse(storedHistory) : [];
    if (initialQuery && !parsedHistory.includes(initialQuery)) {
      parsedHistory.unshift(initialQuery);
    }
    return parsedHistory.slice(0, 10);
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const updateSearchTerm = (newTerm: string) => {
    setSearchHistory((prevHistory) => {
      const updatedHistory = [
        newTerm,
        ...prevHistory.filter((term) => term !== newTerm),
      ];
      if (updatedHistory.length > 10) {
        updatedHistory.pop();
      }
      return updatedHistory;
    });
  };

  const searchTerm = searchHistory[0] || '';

  return [searchTerm, updateSearchTerm, searchHistory] as const;
};

export default useSearchQuery;
