import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from '../components/PokemonCard/PokemonCard';

describe('PokemonCard Component', () => {
  const handleClick = jest.fn();
  const handleSelect = jest.fn();

  test('renders PokemonCard correctly', () => {
    render(
      <PokemonCard
        id="1"
        name="Bulbasaur"
        isSelected={false}
        onClick={handleClick}
        onSelect={handleSelect}
        sprites={{
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        }}
      />
    );

    expect(screen.getByAltText('Bulbasaur')).toBeInTheDocument();
  });

  test('handles selection correctly', () => {
    render(
      <PokemonCard
        id="1"
        name="Bulbasaur"
        isSelected={false}
        onClick={handleClick}
        onSelect={handleSelect}
        sprites={{
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        }}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleSelect).toHaveBeenCalledWith('1');
  });
});
