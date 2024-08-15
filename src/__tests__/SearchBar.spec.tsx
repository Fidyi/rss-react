import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../components/SearchBar/SearchBar';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe('SearchBar Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: {},
      push: jest.fn(),
    });
  });

  test('renders input and button', async () => {
    render(
      <Provider store={store}>
        <SearchBar searchTerm="" />
      </Provider>
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Search Pokemon...')
      ).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });
  });

  test('dispatches search term', async () => {
    render(
      <Provider store={store}>
        <SearchBar searchTerm="" />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Search Pokemon...'), {
      target: { value: 'Pikachu' },
    });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(store.getState().search.searchTerm).toBe('Pikachu');
    });
  });

  test('loads initial search term from props', async () => {
    render(
      <Provider store={store}>
        <SearchBar searchTerm="Bulbasaur" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Bulbasaur')).toBeInTheDocument();
    });
  });

  test('updates input value on change', async () => {
    render(
      <Provider store={store}>
        <SearchBar searchTerm="" />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Search Pokemon...');
    fireEvent.change(input, { target: { value: 'Charmander' } });

    await waitFor(() => {
      expect(input).toHaveValue('Charmander');
    });
  });
});
