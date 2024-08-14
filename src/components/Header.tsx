import React from 'react';
import SearchBar from './SearchBar/SearchBar';
import ThemeSelector from './ThemeSelector/ThemeSelector';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useTheme } from './ThemeContext/ThemeContext';

const Header: React.FC = () => {
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const { theme } = useTheme();

  return (
    <header className={`${theme.background} ${theme.color} p-4 shadow-md`}>
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <SearchBar searchTerm={searchTerm} />
        <ThemeSelector />
      </div>
    </header>
  );
};

export default Header;
