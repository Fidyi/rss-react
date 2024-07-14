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
  onPokemonClick: (id: string) => void;
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
  onSearch: (term: string) => void;
  searchHistory: string[];
};

export type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

export type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

export type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type PokemonDetail = {
  id: string;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: Type[];
  abilities: Ability[];
  stats: Stat[];
  sprites: {
    front_default: string;
  };
};
