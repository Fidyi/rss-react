import { act } from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonListWrapper from '../components/PokemonList/PokemonListWrapper';
import usePokemonData from '../components/utils/usePokemonData';

jest.mock('../components/utils/usePokemonData');

const mockUsePokemonData = usePokemonData as jest.MockedFunction<
  typeof usePokemonData
>;

describe('PokemonListWrapper', () => {
  beforeEach(() => {
    mockUsePokemonData.mockImplementation(() => ({
      pokemons: [],
      totalPages: 0,
      isLoading: false,
      error: 'Pokemon not found',
    }));
  });

  it('renders error state', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <PokemonListWrapper
                  searchTerm="test"
                  onSearch={() => {}}
                  searchHistory={[]}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByText('Pokemon not found')).toBeInTheDocument();
  });

  it('renders no Pokemon found message when no pokemons are available', async () => {
    mockUsePokemonData.mockImplementationOnce(() => ({
      pokemons: [],
      totalPages: 0,
      isLoading: false,
      error: null,
    }));

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <PokemonListWrapper
                  searchTerm="test"
                  onSearch={() => {}}
                  searchHistory={[]}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      );
    });

    expect(screen.getByText('No Pokemon found')).toBeInTheDocument();
  });
});
