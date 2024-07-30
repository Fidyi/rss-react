import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { setupApiStore } from './test-utils';
import {
  apiSlice,
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../redux/slices/apiSlice';
import PokemonListWrapper from '../components/PokemonList/PokemonListWrapper';

const { store } = setupApiStore(apiSlice);

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
        <MemoryRouter>
          <PokemonListWrapper />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state', async () => {
    mockUseGetPokemonsQuery.mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: { status: 500 },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListWrapper />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/error loading data/i)).toBeInTheDocument();
  });

  test('renders Pokemon list', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <PokemonListWrapper />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/pokemon1/i)).toBeInTheDocument();
  });
});
