import { render, screen, fireEvent } from '@testing-library/react';
import SearchHistory from '../components/SearchHistory/SearchHistoryProps';

describe('SearchHistory', () => {
  const searchHistory = ['Pikachu', 'Bulbasaur', 'Charmander'];
  const handleSearch = jest.fn();

  test('renders search history items', () => {
    render(
      <SearchHistory searchHistory={searchHistory} onSearch={handleSearch} />
    );

    searchHistory.forEach((term) => {
      expect(screen.getByText(term)).toBeInTheDocument();
    });
  });

  test('calls onSearch when a history item is clicked', () => {
    render(
      <SearchHistory searchHistory={searchHistory} onSearch={handleSearch} />
    );

    fireEvent.click(screen.getByText('Pikachu'));
    expect(handleSearch).toHaveBeenCalledWith('Pikachu');

    fireEvent.click(screen.getByText('Charmander'));
    expect(handleSearch).toHaveBeenCalledWith('Charmander');
  });
});
