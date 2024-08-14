import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';

const PokemonListWrapper: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const selectedItems = useSelector(
    (state: RootState) => state.selected.selectedItems
  );

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isPokemonLoading,
  } = useGetPokemonsQuery({
    limit: 15,
    offset: (currentPage - 1) * 15,
  });

  const {
    data: searchData,
    error: searchError,
    isLoading: isSearchLoading,
  } = useGetPokemonByNameQuery(searchTerm, {
    skip: !searchTerm,
  });

  const pokemons =
    searchTerm && searchData
      ? [
          {
            ...searchData,
            id: searchData.id,
            url:
              searchData.url ||
              `https://pokeapi.co/api/v2/pokemon/${searchData.id}/`,
            sprites: searchData.sprites,
          },
        ]
      : pokemonData?.results.map((pokemon: PokemonListItem) => ({
          ...pokemon,
          id: pokemon.url.split('/').filter(Boolean).pop() || '',
        })) || [];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/?page=${page}`);
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
          totalPages={Math.ceil((pokemonData?.count || 0) / 15)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PokemonListWrapper;
