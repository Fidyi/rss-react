export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type PokemonCardProps = {
  id: string;
  name: string;
};

export type PokemonListProps = {
  pokemons: Pokemon[];
};

export type SearchBarProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
  searchHistory: string[];
};

export type SimulateErrorButtonProps = {
  onClick: () => void;
};

export type Pokemon = {
  id: string;
  name: string;
};

export type PokemonListWrapperProps = {
  searchTerm: string;
};
