import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import PokemonDetailPage, {
  getServerSideProps,
} from '../../pages/details/[id]';
import store from '../redux/store';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ query: {}, push: jest.fn() }),
}));

describe('PokemonDetailPage', () => {
  it('renders Pokemon details', () => {
    const mockPokemonData = {
      id: '1',
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      types: [{ slot: 1, type: { name: 'grass', url: '' } }],
      abilities: [
        { ability: { name: 'overgrow', url: '' }, is_hidden: false, slot: 1 },
      ],
      stats: [{ base_stat: 45, effort: 0, stat: { name: 'speed', url: '' } }],
      sprites: { front_default: 'https://example.com/bulbasaur.png' },
    };

    render(
      <Provider store={store}>
        <ThemeProvider>
          <PokemonDetailPage pokemon={mockPokemonData} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/height:/i)).toBeInTheDocument();
    expect(screen.getByText(/weight:/i)).toBeInTheDocument();
  });

  it('renders error message when no Pokemon data is available', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <PokemonDetailPage pokemon={null} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/error loading data/i)).toBeInTheDocument();
  });

  it('handles getServerSideProps correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: '1',
            name: 'bulbasaur',
            height: 7,
            weight: 69,
            base_experience: 64,
            types: [{ slot: 1, type: { name: 'grass', url: '' } }],
            abilities: [
              {
                ability: { name: 'overgrow', url: '' },
                is_hidden: false,
                slot: 1,
              },
            ],
            stats: [
              { base_stat: 45, effort: 0, stat: { name: 'speed', url: '' } },
            ],
            sprites: { front_default: 'https://example.com/bulbasaur.png' },
          }),
      })
    ) as jest.Mock;

    const context: Partial<GetServerSidePropsContext<ParsedUrlQuery>> = {
      params: { id: '1' },
    };
    const result = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    expect(result).toEqual({
      props: {
        pokemon: {
          id: '1',
          name: 'bulbasaur',
          height: 7,
          weight: 69,
          base_experience: 64,
          types: [{ slot: 1, type: { name: 'grass', url: '' } }],
          abilities: [
            {
              ability: { name: 'overgrow', url: '' },
              is_hidden: false,
              slot: 1,
            },
          ],
          stats: [
            { base_stat: 45, effort: 0, stat: { name: 'speed', url: '' } },
          ],
          sprites: { front_default: 'https://example.com/bulbasaur.png' },
        },
      },
    });
  });

  it('handles getServerSideProps with fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    ) as jest.Mock;

    const context: Partial<GetServerSidePropsContext<ParsedUrlQuery>> = {
      params: { id: '1' },
    };
    const result = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    expect(result).toEqual({
      props: {
        pokemon: null,
      },
    });
  });
});
