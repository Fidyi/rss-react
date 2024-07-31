import React from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import SimulateErrorButton from './components/ErrorBoundary/SimulateErrorButton';
import SearchHistory from './components/SearchHistory/SearchHistoryProps';
import Flyout from './components/Flyout/Flyout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import PokemonListWrapper from './components/PokemonList/PokemonListWrapper';
import PokemonDetail from './components/PokemonDetail/PokemonDetail';
import './App.css';
import {
  useTheme,
  ThemeProvider,
} from './components/ThemeContext/ThemeContext';
import ThemeSelector from './components/ThemeSelector/ThemeSelector';

const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const appStyle = {
    background: theme.background,
    color: theme.color,
    minHeight: '100vh',
    padding: '20px',
  };

  const handleLeftPanelClick = () => {
    navigate('/');
  };

  return (
    <div style={appStyle}>
      <ThemeSelector />
      <SearchBar searchTerm={''} />
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
      <Flyout />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
