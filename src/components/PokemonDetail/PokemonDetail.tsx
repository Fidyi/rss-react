import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PokemonDetail as PokemonDetailType } from '../types';
import './pokemon-detail.css';

type PokemonDetailParams = {
  id: string;
};

const PokemonDetail: React.FC = () => {
  const { id } = useParams<PokemonDetailParams>();
  const [pokemon, setPokemon] = useState<PokemonDetailType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch Pokemon details');
        }
        const data = await response.json();
        setPokemon({
          id: String(data.id),
          name: data.name,
          height: data.height,
          weight: data.weight,
          base_experience: data.base_experience,
          types: data.types,
          abilities: data.abilities,
          stats: data.stats,
          sprites: data.sprites,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="pokemon-detail">
      <button onClick={() => navigate('/')}>Close</button>
      {pokemon && (
        <>
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <div className="details">
            <p>
              <strong>Height:</strong> {pokemon.height}
            </p>
            <p>
              <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p>
              <strong>Base Experience:</strong> {pokemon.base_experience}
            </p>
            <div>
              <strong>Types:</strong>
              <ul>
                {pokemon.types.map((typeInfo) => (
                  <li key={typeInfo.type.name}>{typeInfo.type.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Abilities:</strong>
              <ul>
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
              <ul>
                {pokemon.stats.map((statInfo) => (
                  <li key={statInfo.stat.name}>
                    {statInfo.stat.name}: {statInfo.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
