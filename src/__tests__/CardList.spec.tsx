import { render, screen } from '@testing-library/react';
import PokemonList from '../components/PokemonList/PokemonList';

const mockPokemons = [
  { id: '1', name: 'bulbasaur', sprites: { front_default: '' }, url: '' },
  { id: '2', name: 'ivysaur', sprites: { front_default: '' }, url: '' },
];

describe('CardList', () => {
  it('renders a list of Pokémon', () => {
    render(
      <PokemonList
        pokemons={mockPokemons}
        onPokemonClick={() => {}}
        selectedItems={[]}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText('bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('ivysaur')).toBeInTheDocument();
  });
});
