'use client';
import React from 'react';
import SimulateErrorButton from '../src/components/ErrorBoundary/SimulateErrorButton';
import Flyout from '../src/components/Flyout/Flyout';
import dynamic from 'next/dynamic';

const PokemonListWrapper = dynamic(
  () => import('../src/components/PokemonList/PokemonListWrapper'),
  {
    ssr: false,
  }
);

const HomePage: React.FC = () => {
  return (
    <>
      <SimulateErrorButton onClick={() => console.error('Simulated Error')} />
      <PokemonListWrapper />
      <Flyout />
    </>
  );
};

export default HomePage;
