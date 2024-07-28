import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import { setupApiStore } from './test-utils';
import { apiSlice } from '../redux/apiSlice';
import { setSearchTerm } from '../redux/slices/searchSlice';

const { store } = setupApiStore(apiSlice);

beforeEach(() => {
  store.dispatch = jest.fn();
});

test('clicking Search button dispatches setSearchTerm action', () => {
  render(
    <Provider store={store}>
      <Router>
        <SearchBar searchTerm="" />
      </Router>
    </Provider>
  );

  const input = screen.getByPlaceholderText('Search Pokemon...');
  fireEvent.change(input, { target: { value: 'Pikachu' } });
  fireEvent.click(screen.getByText('Search'));

  expect(store.dispatch).toHaveBeenCalledWith(setSearchTerm('Pikachu'));
});

test('initial input value is set from the search term', () => {
  store.dispatch(setSearchTerm('Charmander'));

  render(
    <Provider store={store}>
      <Router>
        <SearchBar searchTerm="Charmander" />
      </Router>
    </Provider>
  );

  expect(screen.getByPlaceholderText('Search Pokemon...')).toHaveValue(
    'Charmander'
  );
});
