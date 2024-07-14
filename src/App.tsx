import React, { useRef } from 'react';
import PokemonListWrapper from './components/PokemonList/PokemonListWrapper';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SimulateErrorButton from './components/ErrorBoundary/SimulateErrorButton';
import useSearchQuery from './components/utils/useSearchQuery';
import './App.css';

const App: React.FC = () => {
  const errorBoundaryRef = useRef<ErrorBoundary>(null);
  const [searchTerm, updateSearchTerm, searchHistory] = useSearchQuery('');

  const simulateError = () => {
    if (errorBoundaryRef.current) {
      errorBoundaryRef.current.handleSimulatedError();
    }
  };

  const handleSearch = (term: string) => {
    updateSearchTerm(term);
  };

  return (
    <div className="App">
      <ErrorBoundary ref={errorBoundaryRef}>
        <SearchBar
          searchTerm={searchTerm}
          onSearch={handleSearch}
          searchHistory={searchHistory}
        />
        <SimulateErrorButton onClick={simulateError} />
        <PokemonListWrapper searchTerm={searchTerm} />
      </ErrorBoundary>
    </div>
  );
};

export default App;
