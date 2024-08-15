import { GetServerSideProps } from 'next';
import Layout from '../src/components/Layout';
import PokemonListWrapper from '../src/components/PokemonList/PokemonListWrapper';
import Flyout from '../src/components/Flyout/Flyout';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectItem,
  unselectItem,
  clearSelections,
} from '../src/redux/slices/selectedSlice';
import { RootState } from '../src/redux/store';
import { PokemonListItem } from '../src/components/types';

type HomePageProps = {
  initialPokemons: (PokemonListItem & {
    id: string;
    sprites?: { front_default: string };
  })[];
  totalPages: number;
  currentPage: number;
  search: string;
};

const HomePage: React.FC<HomePageProps> = ({
  initialPokemons,
  totalPages,
  currentPage,
  search,
}) => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selected.selectedItems
  );

  const handleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      dispatch(unselectItem(id));
    } else {
      dispatch(selectItem(id));
    }
  };

  const handleUnselectAll = () => {
    dispatch(clearSelections());
  };

  return (
    <Layout searchTerm={search}>
      <PokemonListWrapper
        initialPokemons={initialPokemons}
        totalPages={totalPages}
        currentPage={currentPage}
        selectedItems={selectedItems}
        onSelect={handleSelect}
      />
      <Flyout
        detailedPokemons={[]}
        selectedItems={selectedItems}
        onUnselectAll={handleUnselectAll}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page
    ? parseInt(context.query.page as string, 10)
    : 1;
  const search = context.query.search ? (context.query.search as string) : '';

  let initialPokemons = [];
  let totalPages = 0;

  if (search) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    if (res.ok) {
      const pokemon = await res.json();
      initialPokemons = [
        {
          ...pokemon,
          id: pokemon.id.toString(),
          sprites: { front_default: pokemon.sprites.front_default },
        },
      ];
      totalPages = 1;
    }
  } else {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`
    );
    const pokemonList = await res.json();
    initialPokemons = pokemonList.results.map((pokemon: PokemonListItem) => {
      const id = pokemon.url.split('/').filter(Boolean).pop();
      return {
        ...pokemon,
        id,
        sprites: {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
        },
      };
    });
    totalPages = Math.ceil(pokemonList.count / 10);
  }

  return {
    props: {
      initialPokemons,
      totalPages,
      currentPage: page,
      search,
    },
  };
};

export default HomePage;
