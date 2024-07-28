import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonList from '../components/PokemonList/PokemonList';

const mockPokemons = [
  { id: '1', name: 'Bulbasaur' },
  { id: '2', name: 'Ivysaur' },
];

test('renders the specified number of cards', () => {
  render(<PokemonList pokemons={mockPokemons} onPokemonClick={() => {}} />);
  expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(
    mockPokemons.length
  );
});

test('displays an appropriate message if no cards are present', () => {
  render(<PokemonList pokemons={[]} onPokemonClick={() => {}} />);
  expect(screen.getByText('No Pokemon found')).toBeInTheDocument();
});
