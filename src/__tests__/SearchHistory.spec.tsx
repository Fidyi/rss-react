import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { RootState } from '../redux/store';
import { apiSlice } from '../redux/apiSlice';
import SearchHistory from '../components/SearchHistory/SearchHistoryProps';

const mockStore = configureStore<RootState>([]);
let store: MockStoreEnhanced<RootState>;

beforeEach(() => {
  store = mockStore({
    search: {
      searchTerm: '',
      searchHistory: ['Pikachu', 'Charmander'],
    },
    [apiSlice.reducerPath]: apiSlice.reducer(undefined, { type: 'INIT' }),
  });
});

test('renders search history', () => {
  render(
    <Provider store={store}>
      <SearchHistory />
    </Provider>
  );

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
  expect(screen.getByText('Charmander')).toBeInTheDocument();
});
