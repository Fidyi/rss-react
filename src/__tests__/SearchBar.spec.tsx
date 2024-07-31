import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupApiStore } from './test-utils';
import { apiSlice } from '../redux/slices/apiSlice';
import SearchBar from '../components/SearchBar/SearchBar';

const { store } = setupApiStore(apiSlice);

describe('SearchBar Component', () => {
  test('renders input and button', () => {
    render(
      <Provider store={store}>
        <SearchBar searchTerm="" />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText('Search Pokemon...')
    ).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('dispatches search term', () => {
    render(
      <Provider store={store}>
        <SearchBar searchTerm="" />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search Pokemon...'), {
      target: { value: 'Pikachu' },
    });
    fireEvent.click(screen.getByText('Search'));

    expect(store.getState().search.searchTerm).toBe('Pikachu');
  });

  test('loads initial search term from props', () => {
    render(
      <Provider store={store}>
        <SearchBar searchTerm="Bulbasaur" />
      </Provider>
    );

    expect(screen.getByDisplayValue('Bulbasaur')).toBeInTheDocument();
  });

  test('updates input value on change', () => {
    render(
      <Provider store={store}>
        <SearchBar searchTerm="" />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search Pokemon...');
    fireEvent.change(input, { target: { value: 'Charmander' } });
    expect(input).toHaveValue('Charmander');
  });
});
