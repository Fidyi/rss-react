export type SearchBarProps = {
  searchTerm: string;
  onSearch: (term: string) => void;
};

export type SearchBarState = {
  searchTerm: string;
};

export type Pokemon = {
  name: string;
  imageUrl: string;
};

export type PokemonListProps = {
  pokemons: Pokemon[];
};

export type PokemonCardProps = {
  imageUrl: string;
  name: string;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
