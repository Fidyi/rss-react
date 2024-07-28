import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import SearchHistory from '../components/SearchHistory/SearchHistoryProps';
import { setSearchTerm } from '../redux/slices/searchSlice';
import { RootState } from '../redux/store';

const mockStore = configureStore<RootState>([]);
let store: MockStoreEnhanced<RootState>;

beforeEach(() => {
  store = mockStore({
    search: {
      searchTerm: '',
      searchHistory: ['Pikachu', 'Charmander'],
    },
  });
  store.dispatch = jest.fn();
});

test('renders search history items', () => {
  render(
    <Provider store={store}>
      <SearchHistory />
    </Provider>
  );

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  expect(screen.getByText('Charmander')).toBeInTheDocument();
});

test('calls onSearch when a history item is clicked', () => {
  render(
    <Provider store={store}>
      <SearchHistory />
    </Provider>
  );

  fireEvent.click(screen.getByText('Pikachu'));
  expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm('Pikachu'));
});
