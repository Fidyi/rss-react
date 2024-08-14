import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { PokemonListProps } from '../types';

const PokemonList: React.FC<
  PokemonListProps & {
    onPokemonClick: (name: string) => void;
    selectedItems: string[];
    onSelect: (id: string) => void;
  }
> = ({ pokemons, onPokemonClick, selectedItems, onSelect }) => {
  if (pokemons.length === 0) {
    return <h3>No Pokemon found</h3>;
  }

  return (
    <div className="flex flex-wrap items-center justify-center">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          onClick={() => onPokemonClick(pokemon.name)}
          isSelected={selectedItems.includes(pokemon.id)}
          onSelect={onSelect}
          sprites={pokemon.sprites}
        />
      ))}
    </div>
  );
};

export default PokemonList;
