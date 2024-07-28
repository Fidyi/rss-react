import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar/SearchBar';

beforeEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

test('clicking Search button saves value to local storage', () => {
  const handleSearch = jest.fn();
  render(<SearchBar searchTerm="" onSearch={handleSearch} />);

  const input = screen.getByPlaceholderText('Search Pokemon...');
  fireEvent.change(input, { target: { value: 'Pikachu' } });
  fireEvent.click(screen.getByText('Search'));

  expect(localStorage.getItem('searchTerm')).toBe('Pikachu');
});

test('retrieves value from local storage on mount', () => {
  localStorage.setItem('searchTerm', 'Charmander');
  render(<SearchBar searchTerm="" onSearch={() => {}} />);

  expect(screen.getByPlaceholderText('Search Pokemon...')).toHaveValue(
    'Charmander'
  );
});
