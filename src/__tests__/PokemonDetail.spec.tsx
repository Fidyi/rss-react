import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail';
import { act } from 'react';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        id: '1',
        name: 'Bulbasaur',
        height: 7,
        weight: 69,
        base_experience: 64,
        types: [{ slot: 1, type: { name: 'grass', url: '' } }],
        abilities: [
          { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
        ],
        stats: [{ base_stat: 45, effort: 0, stat: { name: 'hp', url: '' } }],
        sprites: {
          front_default:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        },
      }),
  } as Response)
);

test('displays loading indicator while fetching data', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    );
  });
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('clicking close button hides the component', async () => {
  await act(async () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route path="/details/:id" element={<PokemonDetail />} />
        </Routes>
      </MemoryRouter>
    );
  });

  await waitFor(() =>
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
  );

  await act(async () => {
    fireEvent.click(screen.getByText('Close'));
  });

  expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
});
