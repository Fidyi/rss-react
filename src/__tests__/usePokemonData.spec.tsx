import { render, waitFor } from '@testing-library/react';
import { useEffect } from 'react';
import usePokemonData from '../components/utils/usePokemonData';

const TestComponent = ({
  searchTerm,
  currentPage,
}: {
  searchTerm: string;
  currentPage: number;
}) => {
  const { pokemons, totalPages, isLoading, error } = usePokemonData(
    searchTerm,
    currentPage
  );

  useEffect(() => {
    console.log({ pokemons, totalPages, isLoading, error });
  }, [pokemons, totalPages, isLoading, error]);

  return null;
};

describe('usePokemonData', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock) = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should fetch and return pokemons successfully', async () => {
    const mockPokemonResponse = {
      count: 1,
      results: [
        {
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
      ],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemonResponse,
    });

    render(<TestComponent searchTerm="" currentPage={1} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
      );
    });
  });

  test('should handle error when fetching pokemons', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    render(<TestComponent searchTerm="" currentPage={1} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'
      );
    });
  });

  test('should handle fetching single pokemon by name', async () => {
    const mockPokemonDetailResponse = {
      id: 1,
      name: 'bulbasaur',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPokemonDetailResponse,
    });

    render(<TestComponent searchTerm="bulbasaur" currentPage={1} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/bulbasaur'
      );
    });
  });

  test('should handle error when pokemon is not found', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    render(<TestComponent searchTerm="unknown" currentPage={1} />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/unknown'
      );
    });
  });
});
