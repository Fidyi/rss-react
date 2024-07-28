import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import SimulateErrorButton from './components/ErrorBoundary/SimulateErrorButton';
import SearchBar from './components/SearchBar/SearchBar';
import PokemonListWrapper from './components/PokemonList/PokemonListWrapper';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import './App.css';
import SearchHistory from './components/SearchHistory/SearchHistoryProps';

const App: React.FC = () => {
  const navigate = useNavigate();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const handleLeftPanelClick = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <SearchBar searchTerm={searchTerm} />
      <SimulateErrorButton onClick={() => console.error('Simulated Error')} />
      <div className="main-layout">
        <div className="left-panel" onClick={handleLeftPanelClick}>
          <SearchHistory />
        </div>
        <div className="right-panel">
          <Routes>
            <Route path="/" element={<PokemonListWrapper />} />
            <Route path="/details/:id" element={<PokemonDetail />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
