import { GetServerSideProps } from 'next';
import Layout from '../../src/components/Layout';
import PokemonDetail from '../../src/components/PokemonDetail/PokemonDetail';
import { PokemonDetail as PokemonDetailType } from '../../src/components/types';

type PokemonDetailPageProps = {
  pokemon?: PokemonDetailType | null;
};

const PokemonDetailPage: React.FC<PokemonDetailPageProps> = ({ pokemon }) => {
  return (
    <Layout>
      <PokemonDetail pokemon={pokemon} />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!response.ok) {
      return {
        props: {
          pokemon: null,
        },
      };
    }

    const pokemon = await response.json();
    return {
      props: {
        pokemon,
      },
    };
  } catch (error) {
    return {
      props: {
        pokemon: null,
      },
    };
  }
};

export default PokemonDetailPage;
