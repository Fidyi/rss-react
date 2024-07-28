import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SimulateErrorButton from './components/ErrorBoundary/SimulateErrorButton';
import SearchBar from './components/SearchBar/SearchBar';
import useSearchQuery from './components/utils/useSearchQuery';
import PokemonListWrapper from './components/PokemonList/PokemonListWrapper';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import './App.css';
import SearchHistory from './components/SearchHistory/SearchHistoryProps';

const App: React.FC = () => {
  const [searchTerm, updateSearchTerm, searchHistory] = useSearchQuery('');
  const navigate = useNavigate();

  const handleSearch = (term: string) => {
    updateSearchTerm(term);
    navigate('/');
  };

  const handleLeftPanelClick = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <ErrorBoundary>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <SimulateErrorButton onClick={() => console.error('Simulated Error')} />
        <div className="main-layout">
          <div className="left-panel" onClick={handleLeftPanelClick}>
            <SearchHistory
              searchHistory={searchHistory}
              onSearch={handleSearch}
            />
          </div>
          <div className="right-panel">
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
              <Route path="/details/:id" element={<PokemonDetail />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default App;
