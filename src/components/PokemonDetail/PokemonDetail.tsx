import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetPokemonByNameQuery } from '../../redux/apiSlice';
import './pokemon-detail.css';

type PokemonDetailParams = {
  id: string;
};

const PokemonDetail: React.FC = () => {
  const { id } = useParams<PokemonDetailParams>();
  const navigate = useNavigate();

  const {
    data: pokemon,
    error,
    isLoading,
  } = useGetPokemonByNameQuery(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return <div>Error loading data</div>;
  }
  if (!pokemon) {
    return null;
  }

  return (
    <div className="pokemon-detail">
      <button onClick={() => navigate('/')}>Close</button>
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
    </div>
  );
};

export default PokemonDetail;
