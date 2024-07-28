import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import usePokemonData from '../utils/usePokemonData';
import PokemonList from './PokemonList';
import './PokemonListWrapper.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const PokemonListWrapper: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const navigate = useNavigate();

  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const { pokemons, totalPages, isLoading, error } = usePokemonData(
    searchTerm,
    currentPage
  );

  const handlePageChange = (page: number) => {
    setSearchParams({ search: searchTerm, page: page.toString() });
  };

  const handlePokemonClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Pokemon not found</div>}
      {!isLoading && !error && (
        <>
          <PokemonList
            pokemons={pokemons}
            onPokemonClick={handlePokemonClick}
          />
          {pokemons.length > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </>
  );
};

export default PokemonListWrapper;
