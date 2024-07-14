import { useState, useEffect, useCallback } from 'react';
import { Pokemon } from '../types';

const usePokemonData = (searchTerm: string, currentPage: number) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    const limit = 10;
    const offset = (currentPage - 1) * limit;

    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    if (searchTerm) {
      url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        let pokemons: Pokemon[] = [];
        let totalPages = 0;

        if (searchTerm) {
          if (data.id) {
            pokemons = [
              {
                id: String(data.id),
                name: data.name,
              },
            ];
            totalPages = 1;
          } else {
            throw new Error(`Pokemon "${searchTerm}" not found.`);
          }
        } else {
          pokemons = data.results.map(
            (pokemon: { name: string; url: string }) => ({
              id: pokemon.url.split('/').filter(Boolean).pop() || '',
              name: pokemon.name,
            })
          );
          totalPages = Math.ceil(data.count / limit);
        }

        setPokemons(pokemons);
        setTotalPages(totalPages);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [searchTerm, currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { pokemons, totalPages, isLoading, error, fetchData };
};

export default usePokemonData;
