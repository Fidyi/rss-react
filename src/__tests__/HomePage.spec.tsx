import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupApiStore } from './test-utils';
import { useRouter } from 'next/router';
import { apiSlice } from '../redux/slices/apiSlice';
import HomePage from '../../pages';
import PokemonDetail from '../../pages/details/[id]';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const { store } = setupApiStore(apiSlice);

describe('HomePage Component', () => {
  beforeEach(() => {
    store.dispatch({
      type: 'selected/selectItem',
      payload: '1',
    });
    store.dispatch({
      type: 'search/addToHistory',
      payload: 'Pikachu',
    });
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
    });
  });

  test('renders SearchBar component', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(
      screen.getByPlaceholderText('Search Pokemon...')
    ).toBeInTheDocument();
  });

  test('renders SimulateErrorButton component', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(screen.getByText('Simulate Error')).toBeInTheDocument();
  });

  test('renders SearchHistory component', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(screen.getByText(/Recent Searches/i)).toBeInTheDocument();
  });

  test('renders Flyout component', () => {
    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
    expect(screen.getByText(/1 pokemons are selected/i)).toBeInTheDocument();
  });
});

describe('PokemonDetail Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: { id: '1' },
    });
  });

  test('navigates to PokemonDetail page', () => {
    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
