import { Component } from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { PokemonListProps } from '../types';

class PokemonList extends Component<PokemonListProps> {
  render() {
    const { pokemons } = this.props;

    return (
      <div className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            imageUrl={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`}
            name={pokemon.name}
          />
        ))}
      </div>
    );
  }
}

export default PokemonList;
