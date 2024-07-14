import React from 'react';
import PokemonCard from '../PokemonCard/PokemonCard';
import { PokemonListProps } from '../types';
import './pokemon-list.css';

const PokemonList: React.FC<PokemonListProps> = ({ pokemons }) => {
  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
      ))}
    </div>
  );
};

export default PokemonList;
