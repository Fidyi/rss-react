import React from 'react';
import SimulateErrorButton from '../src/components/ErrorBoundary/SimulateErrorButton';
import Flyout from '../src/components/Flyout/Flyout';
import PokemonListWrapper from '../src/components/PokemonList/PokemonListWrapper';
import Layout from '../src/components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <SimulateErrorButton onClick={() => console.error('Simulated Error')} />
      <PokemonListWrapper />
      <Flyout />
    </Layout>
  );
};

export default HomePage;
