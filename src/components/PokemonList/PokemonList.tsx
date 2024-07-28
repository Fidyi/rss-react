import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { PokemonListProps } from '../types';
import './pokemon-list.css';

const PokemonList: React.FC<
  PokemonListProps & { onPokemonClick: (name: string) => void }
> = ({ pokemons, onPokemonClick }) => {
  if (pokemons.length === 0) {
    return <h3>No Pokemon found</h3>;
  }

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          onClick={() => onPokemonClick(pokemon.name)}
        />
      ))}
    </div>
  );
};

export default PokemonList;
