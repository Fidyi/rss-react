import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import PokemonListWrapper from '../components/PokemonList/PokemonListWrapper';
import store from '../redux/store';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe('PokemonListWrapper Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });
  });

  const mockPokemons = [
    {
      id: '1',
      name: 'pokemon1',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      sprites: { front_default: 'https://example.com/image.png' },
    },
  ];

  test('renders Pokemon list', () => {
    render(
      <Provider store={store}>
        <PokemonListWrapper
          initialPokemons={mockPokemons}
          totalPages={1}
          currentPage={1}
          selectedItems={[]}
          onSelect={jest.fn()}
        />
      </Provider>
    );

    expect(screen.getByText(/pokemon1/i)).toBeInTheDocument();
  });

  test('handles selecting and unselecting items', () => {
    const onSelectMock = jest.fn();

    render(
      <Provider store={store}>
        <PokemonListWrapper
          initialPokemons={mockPokemons}
          totalPages={1}
          currentPage={1}
          selectedItems={[]}
          onSelect={onSelectMock}
        />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(onSelectMock).toHaveBeenCalledWith('1');
  });

  test('handles page change correctly', () => {
    render(
      <Provider store={store}>
        <PokemonListWrapper
          initialPokemons={mockPokemons}
          totalPages={2}
          currentPage={1}
          selectedItems={[]}
          onSelect={jest.fn()}
        />
      </Provider>
    );

    const nextPageButton = screen.getByText(/2/);
    fireEvent.click(nextPageButton);

    expect(mockUseRouter().push).toHaveBeenCalledWith('/?page=2');
  });
});
