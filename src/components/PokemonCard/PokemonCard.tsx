import React from 'react';
import { PokemonCardProps } from '../types';
import './pokemon-card.css';

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name }) => {
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="pokemon-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
    </div>
  );
};

export default PokemonCard;
