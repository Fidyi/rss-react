import Image from 'next/image';
import React from 'react';
import { PokemonCardProps } from '../types';

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
    <div className="flex flex-col items-center min-w-[100px] m-4 border-4 border-yellow-500 p-2 rounded cursor-pointer">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onSelect(id)}
        className="mb-2"
      />
      <Image
        src={imageUrl}
        alt={name}
        width={100}
        height={100}
        onClick={onClick}
        className="cursor-pointer"
      />
      <h3 className="mt-2">{name}</h3>
    </div>
  );
};

export default PokemonCard;
