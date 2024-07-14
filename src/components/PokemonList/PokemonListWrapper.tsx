import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import usePokemonData from '../utils/usePokemonData';
import PokemonList from './PokemonList';
import './PokemonListWrapper.css';
import SearchHistory from '../SearchHistory/SearchHistoryProps';

type PokemonListWrapperProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
  searchHistory: string[];
};

const PokemonListWrapper: React.FC<PokemonListWrapperProps> = ({
  searchTerm,
  onSearch,
  searchHistory,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const { pokemons, totalPages, isLoading, error } = usePokemonData(
    searchTerm,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setSearchParams({ search: searchTerm, page: page.toString() });
  };

  return (
    <div className="pokemon-list-wrapper">
      <div className="left-panel">
        <SearchHistory searchHistory={searchHistory} onSearch={onSearch} />
      </div>
      <div className="right-panel">
        {isLoading && <div>Loading...</div>}
        {error && <div>Pokemon not found</div>}
        {!isLoading && !error && (
          <>
            <PokemonList pokemons={pokemons} />
            {pokemons.length > 0 && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PokemonListWrapper;
