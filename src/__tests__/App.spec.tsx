import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setupApiStore } from './test-utils';
import App from '../App';
import { apiSlice } from '../redux/slices/apiSlice';

const { store } = setupApiStore(apiSlice);

describe('App Component', () => {
  beforeEach(() => {
    store.dispatch({
      type: 'selected/selectItem',
      payload: '1',
    });
  });

  test('renders SearchBar component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByPlaceholderText('Search Pokemon...')
    ).toBeInTheDocument();
  });

  test('renders SimulateErrorButton component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Simulate Error')).toBeInTheDocument();
  });

  test('renders SearchHistory component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Recent Searches:')).toBeInTheDocument();
  });

  test('renders Flyout component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(/1 pokemons are selected/i)).toBeInTheDocument();
  });

  test('renders 404 page on unknown route', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/unknown']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });

  test('navigates to PokemonDetail page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details/1']}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
