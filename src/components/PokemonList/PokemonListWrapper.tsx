import React from 'react';
import { useRouter } from 'next/router';
import Pagination from '../Pagination/Pagination';
import PokemonList from './PokemonList';
import { PokemonListItem } from '../types';

type PokemonListWrapperProps = {
  initialPokemons: (PokemonListItem & {
    id: string;
    sprites?: { front_default: string };
  })[];
  totalPages: number;
  currentPage: number;
  selectedItems: string[];
  onSelect: (id: string) => void;
};

const PokemonListWrapper: React.FC<PokemonListWrapperProps> = ({
  initialPokemons,
  totalPages,
  currentPage,
  selectedItems,
  onSelect,
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  const handlePokemonClick = (id: string) => {
    router.push(`/details/${id}`);
  };

  return (
    <div className="flex flex-col items-center">
      <PokemonList
        pokemons={initialPokemons}
        onPokemonClick={handlePokemonClick}
        selectedItems={selectedItems}
        onSelect={onSelect}
      />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PokemonListWrapper;
