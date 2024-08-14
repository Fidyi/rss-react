import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupApiStore } from './test-utils';
import { apiSlice } from '../redux/slices/apiSlice';
import SearchHistory from '../components/SearchHistory/SearchHistory';
import { setSearchTerm } from '../redux/slices/searchSlice';

const { store } = setupApiStore(apiSlice);

describe('SearchHistory Component', () => {
  beforeEach(() => {
    store.dispatch(setSearchTerm('Pikachu'));
    store.dispatch(setSearchTerm('Bulbasaur'));
  });

  test('renders search history', () => {
    render(
      <Provider store={store}>
        <SearchHistory />
      </Provider>
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });

  test('clicking on history item sets search term', () => {
    render(
      <Provider store={store}>
        <SearchHistory />
      </Provider>
    );

    fireEvent.click(screen.getByText('Pikachu'));
    expect(store.getState().search.searchTerm).toBe('Pikachu');
  });
});
