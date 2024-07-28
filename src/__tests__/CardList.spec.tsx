import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonList from '../components/PokemonList/PokemonList';
import { PokemonListItem } from '../components/types';

const mockPokemons: (PokemonListItem & { id: string })[] = [
  { id: '1', name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { id: '2', name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
];

test('renders a list of Pokemon', () => {
  render(<PokemonList pokemons={mockPokemons} onPokemonClick={() => {}} />);

  expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  expect(screen.getByText('Ivysaur')).toBeInTheDocument();
});
