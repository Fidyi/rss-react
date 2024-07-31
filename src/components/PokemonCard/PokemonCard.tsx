import React from 'react';
import { PokemonCardProps } from '../types';
import './pokemon-card.css';

const PokemonCard: React.FC<
  PokemonCardProps & {
    onClick: () => void;
    isSelected: boolean;
    onSelect: (id: string) => void;
  }
> = ({ id, name, onClick, isSelected, onSelect, sprites }) => {
  const imageUrl =
    sprites?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="pokemon-card">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(id)}
      />
      <img src={imageUrl} alt={name} onClick={onClick} />
      <h3>{name}</h3>
    </div>
  );
};

export default PokemonCard;
