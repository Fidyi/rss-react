import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonCard from '../components/PokemonCard/PokemonCard';

const mockCard = { id: '1', name: 'Bulbasaur' };

test('renders the relevant card data', () => {
  render(
    <PokemonCard id={mockCard.id} name={mockCard.name} onClick={() => {}} />
  );
  expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
    'Bulbasaur'
  );
  expect(screen.getByAltText('Bulbasaur')).toBeInTheDocument();
});

test('clicking on a card triggers onClick handler', () => {
  const handleClick = jest.fn();
  render(
    <PokemonCard id={mockCard.id} name={mockCard.name} onClick={handleClick} />
  );
  const card = screen.getByRole('heading', { level: 3 });
  fireEvent.click(card);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
