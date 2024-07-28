import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import PokemonList from './PokemonList';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import {
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../../redux/apiSlice';
import './PokemonListWrapper.css';
import { PokemonListItem } from '../types';

const PokemonListWrapper: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isPokemonLoading,
  } = useGetPokemonsQuery({
    limit: 10,
    offset: (currentPage - 1) * 10,
  });

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
  } = useGetPokemonByNameQuery(searchTerm, {
    skip: !searchTerm,
  });

  const [pokemons, setPokemons] = useState<
    (PokemonListItem & { id: string; sprites?: { front_default: string } })[]
  >([]);

  useEffect(() => {
    if (searchTerm && searchData) {
      const id = searchData.id || '';
      setPokemons([
        {
          ...searchData,
          id,
          url: searchData.url || `https://pokeapi.co/api/v2/pokemon/${id}/`,
          sprites: searchData.sprites,
        },
      ]);
    } else if (pokemonData) {
      const pokemonList = pokemonData.results.map(
        (pokemon: PokemonListItem) => {
          const id = pokemon.url.split('/').filter(Boolean).pop() || '';
          return { ...pokemon, id, url: pokemon.url } as PokemonListItem & {
            id: string;
            sprites?: { front_default: string };
          };
        }
      );
      setPokemons(pokemonList);
    }
  }, [searchTerm, searchData, pokemonData]);

  const handlePageChange = (page: number) => {
    setSearchParams({ search: searchTerm, page: page.toString() });
  };

  const handlePokemonClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  if (isPokemonLoading || isSearchLoading) return <div>Loading...</div>;
  if (pokemonError || searchError) return <div>Error loading data</div>;
  if (!pokemonData && !searchData) return null;

  return (
    <>
      <PokemonList pokemons={pokemons} onPokemonClick={handlePokemonClick} />
      {!searchTerm && pokemons.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((pokemonData?.count || 0) / 10)}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default PokemonListWrapper;
