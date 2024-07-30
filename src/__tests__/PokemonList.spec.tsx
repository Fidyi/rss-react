import { render, screen } from '@testing-library/react';
import PokemonList from '../components/PokemonList/PokemonList';

describe('PokemonList Component', () => {
  const pokemons = [
    { id: '1', name: 'Bulbasaur', url: '', sprites: { front_default: '' } },
    { id: '2', name: 'Ivysaur', url: '', sprites: { front_default: '' } },
  ];

  test('renders No Pokemon found message', () => {
    render(
      <PokemonList
        pokemons={[]}
        onPokemonClick={() => {}}
        selectedItems={[]}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText('No Pokemon found')).toBeInTheDocument();
  });

  test('renders list of pokemons', () => {
    render(
      <PokemonList
        pokemons={pokemons}
        onPokemonClick={() => {}}
        selectedItems={[]}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });
});
