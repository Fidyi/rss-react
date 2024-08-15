import Image from 'next/image';
import React from 'react';
import { PokemonDetail as PokemonDetailType } from '../types';

type PokemonDetailProps = {
  pokemon?: PokemonDetailType | null;
};

const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
  if (!pokemon) return <div>Error loading data</div>;
  return (
    <div className="flex justify-center items-center min-h-screen p-4 bg-white text-black">
      <div className="relative max-w-lg w-full p-6 rounded-lg shadow-lg bg-white">
        <button
          className="absolute top-2 right-2 p-2 text-gray-700 dark:text-gray-300"
          onClick={() => window.history.back()}
          style={{ fontSize: '24px', cursor: 'pointer' }}
        >
          ✖
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">{pokemon.name}</h2>
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={96}
          height={96}
          className="block mx-auto mb-4"
        />
        <div className="details text-center">
          <p className="mb-2">
            <strong>Height:</strong> {pokemon.height}
          </p>
          <p className="mb-2">
            <strong>Weight:</strong> {pokemon.weight}
          </p>
          <p className="mb-4">
            <strong>Base Experience:</strong> {pokemon.base_experience}
          </p>
          <div className="mb-4">
            <strong>Types:</strong>
            <ul className="list-none p-0">
              {pokemon.types.map((typeInfo) => (
                <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <strong>Abilities:</strong>
            <ul className="list-none p-0">
              {pokemon.abilities.map((abilityInfo) => (
                <li key={abilityInfo.ability.name}>
                  {abilityInfo.ability.name}
                  {abilityInfo.is_hidden ? ' (Hidden)' : ''}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Base Stats:</strong>
            <ul className="list-none p-0">
              {pokemon.stats.map((statInfo) => (
                <li key={statInfo.stat.name}>
                  {statInfo.stat.name}: {statInfo.base_stat}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetail;
