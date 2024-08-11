import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../Pagination/Pagination';
import PokemonList from './PokemonList';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { selectItem, unselectItem } from '../../redux/slices/selectedSlice';
import {
  useGetPokemonsQuery,
  useGetPokemonByNameQuery,
} from '../../redux/slices/apiSlice';
import { PokemonListItem } from '../types';

const PokemonListWrapper: React.FC = () => {
  const router = useRouter();
  const currentPage = Number(router.query.page) || 1;
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const selectedItems = useSelector(
    (state: RootState) => state.selected.selectedItems
  );

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
  }, [searchTerm, searchData, pokemonData, currentPage]);
  const handlePageChange = (page: number) => {
    router.push({
      pathname: '/',
      query: { page: page.toString() },
    });
  };

  const handlePokemonClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  const handleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      dispatch(unselectItem(id));
    } else {
      dispatch(selectItem(id));
    }
  };

  if (isPokemonLoading || isSearchLoading) return <div>Loading...</div>;
  if (pokemonError || searchError) return <div>No pokemon found :(</div>;

  return (
    <div className="flex flex-col items-center">
      <PokemonList
        pokemons={pokemons}
        onPokemonClick={handlePokemonClick}
        selectedItems={selectedItems}
        onSelect={handleSelect}
      />
      {!searchTerm && pokemons.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil((pokemonData?.count || 0) / 10)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PokemonListWrapper;
