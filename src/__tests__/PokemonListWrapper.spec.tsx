import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupApiStore } from './test-utils';
import {
  apiSlice,
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../redux/slices/apiSlice';
import PokemonListWrapper from '../components/PokemonList/PokemonListWrapper';
import { setSearchTerm } from '../redux/slices/searchSlice';
import { useRouter } from 'next/navigation';

const { store } = setupApiStore(apiSlice);

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

jest.mock('../redux/slices/apiSlice', () => {
  const originalModule = jest.requireActual('../redux/slices/apiSlice');
  return {
    ...originalModule,
    useGetPokemonsQuery: jest.fn(),
    useGetPokemonByNameQuery: jest.fn(),
  };
});

const mockUseGetPokemonsQuery = useGetPokemonsQuery as jest.Mock;
const mockUseGetPokemonByNameQuery = useGetPokemonByNameQuery as jest.Mock;

describe('PokemonListWrapper Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    mockUseGetPokemonsQuery.mockReturnValue({
      data: {
        results: [
          { name: 'pokemon1', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
        count: 1,
      },
      isLoading: false,
      error: null,
    });

    mockUseGetPokemonByNameQuery.mockReturnValue({
      data: {
        id: '1',
        name: 'pokemon1',
        height: 10,
        weight: 100,
        base_experience: 200,
        types: [{ slot: 1, type: { name: 'type1', url: '' } }],
        abilities: [
          { ability: { name: 'ability1', url: '' }, is_hidden: false, slot: 1 },
        ],
        stats: [{ base_stat: 50, effort: 0, stat: { name: 'stat1', url: '' } }],
        sprites: {
          front_default: 'https://pokeapi.co/api/v2/sprites/pokemon/1.png',
        },
      },
      isLoading: false,
      error: null,
    });
  });

  test('renders loading state initially', () => {
    mockUseGetPokemonsQuery.mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonListWrapper />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders no Pokemon found message when there is an error', async () => {
    mockUseGetPokemonsQuery.mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: { status: 500 },
    });

    render(
      <Provider store={store}>
        <PokemonListWrapper />
      </Provider>
    );

    expect(await screen.findByText(/no pokemon found/i)).toBeInTheDocument();
  });

  test('renders Pokemon list', async () => {
    render(
      <Provider store={store}>
        <PokemonListWrapper />
      </Provider>
    );

    expect(await screen.findByText(/pokemon1/i)).toBeInTheDocument();
  });

  test('handles selecting and unselecting items', async () => {
    render(
      <Provider store={store}>
        <PokemonListWrapper />
      </Provider>
    );

    const checkbox = await screen.findByRole('checkbox');
    fireEvent.click(checkbox);

    expect(store.getState().selected.selectedItems).toContain('1');

    fireEvent.click(checkbox);

    expect(store.getState().selected.selectedItems).not.toContain('1');
  });

  test('handles search correctly', async () => {
    store.dispatch(setSearchTerm('pokemon1'));

    render(
      <Provider store={store}>
        <PokemonListWrapper />
      </Provider>
    );

    expect(await screen.findByText(/pokemon1/i)).toBeInTheDocument();
  });
});
