import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import usePokemonData from '../utils/usePokemonData';
import PokemonList from './PokemonList';

type PokemonListWrapperProps = {
  searchTerm: string;
};

const PokemonListWrapper: React.FC<PokemonListWrapperProps> = ({
  searchTerm,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { pokemons, totalPages, isLoading, error } = usePokemonData(
    searchTerm,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Pokemon not found</div>;
  }

  return (
    <>
      <PokemonList pokemons={pokemons} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default PokemonListWrapper;
