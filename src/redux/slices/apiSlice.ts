import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonDetail, PokemonListResponse } from '../../components/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<
      PokemonListResponse,
      { limit: number; offset: number }
    >({
      query: ({ limit, offset }) => `pokemon?limit=${limit}&offset=${offset}`,
    }),
    getPokemonByName: builder.query<PokemonDetail, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByNameQuery } = apiSlice;
