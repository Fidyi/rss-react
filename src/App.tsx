import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SimulateErrorButton from './components/ErrorBoundary/SimulateErrorButton';
import PokemonListWrapper from './components/PokemonList/PokemonListWrapper';
import SearchBar from './components/SearchBar/SearchBar';
import useSearchQuery from './components/utils/useSearchQuery';
import './App.css';

const App: React.FC = () => {
  const [searchTerm, updateSearchTerm, searchHistory] = useSearchQuery('');

  const handleSearch = (term: string) => {
    updateSearchTerm(term);
  };

  return (
    <Router>
      <div className="App">
        <ErrorBoundary>
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <SimulateErrorButton
            onClick={() => console.error('Simulated Error')}
          />
          <Routes>
            <Route
              path="/"
              element={
                <PokemonListWrapper
                  searchTerm={searchTerm}
                  onSearch={handleSearch}
                  searchHistory={searchHistory}
                />
              }
            />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
};

export default App;
