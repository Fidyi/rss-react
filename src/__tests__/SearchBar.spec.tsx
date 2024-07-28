import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import SearchBar from '../components/SearchBar/SearchBar';
import { setSearchTerm } from '../redux/slices/searchSlice';
import { RootState } from '../redux/store';

const mockStore = configureStore<RootState>([]);
let store: MockStoreEnhanced<RootState>;

beforeEach(() => {
  store = mockStore({
    search: {
      searchTerm: '',
      searchHistory: [],
    },
  });
  store.dispatch = jest.fn();
});

test('clicking Search button saves value to Redux store', () => {
  render(
    <Provider store={store}>
      <SearchBar searchTerm="" />
    </Provider>
  );

  const input = screen.getByPlaceholderText('Search Pokemon...');
  fireEvent.change(input, { target: { value: 'Pikachu' } });
  fireEvent.click(screen.getByText('Search'));

  expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm('Pikachu'));
});

test('retrieves value from Redux store on mount', () => {
  store = mockStore({
    search: {
      searchTerm: 'Charmander',
      searchHistory: [],
    },
  });

  render(
    <Provider store={store}>
      <SearchBar searchTerm="Charmander" />
    </Provider>
  );

  expect(screen.getByPlaceholderText('Search Pokemon...')).toHaveValue(
    'Charmander'
  );
});
