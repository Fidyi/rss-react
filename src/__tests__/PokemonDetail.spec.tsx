import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupApiStore } from './test-utils';
import { apiSlice, useGetPokemonByNameQuery } from '../redux/slices/apiSlice';
import { useRouter, useParams } from 'next/navigation';
import PokemonDetail from '../../app/details/[id]/page';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseParams = useParams as jest.Mock;

const { store } = setupApiStore(apiSlice);

jest.mock('../redux/slices/apiSlice', () => {
  const originalModule = jest.requireActual('../redux/slices/apiSlice');
  return {
    ...originalModule,
    useGetPokemonByNameQuery: jest.fn(),
  };
});

const mockUseGetPokemonByNameQuery = useGetPokemonByNameQuery as jest.Mock;

describe('PokemonDetail Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
    });
    mockUseParams.mockReturnValue({ id: '1' });
  });

  test('renders loading state initially', () => {
    mockUseGetPokemonByNameQuery.mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('renders error state', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: true,
    });

    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );

    expect(await screen.findByText(/error loading data/i)).toBeInTheDocument();
  });

  test('renders no data state', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );

    expect(screen.queryByText(/loading/i)).toBeNull();
    expect(screen.queryByText(/error loading data/i)).toBeNull();
  });

  test('renders Pokemon details', async () => {
    mockUseGetPokemonByNameQuery.mockReturnValueOnce({
      data: {
        id: '1',
        name: 'bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        types: [{ slot: 1, type: { name: 'grass', url: '' } }],
        abilities: [
          { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
        ],
        stats: [{ base_stat: 45, effort: 0, stat: { name: 'speed', url: '' } }],
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
      },
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonDetail />
      </Provider>
    );

    expect(await screen.findByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/height:/i)).toBeInTheDocument();
    expect(screen.getByText(/weight:/i)).toBeInTheDocument();
    expect(screen.getByText(/base experience:/i)).toBeInTheDocument();
    expect(screen.getByText(/types:/i)).toBeInTheDocument();
    expect(screen.getByText(/abilities:/i)).toBeInTheDocument();
    expect(screen.getByText(/base stats:/i)).toBeInTheDocument();
  });
});
