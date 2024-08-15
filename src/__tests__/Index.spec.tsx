import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import HomePage, { getServerSideProps } from '../../pages/index';
import store from '../redux/store';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ query: {}, push: jest.fn() }),
}));

describe('HomePage', () => {
  const mockInitialPokemons = [
    {
      id: '1',
      name: 'bulbasaur',
      sprites: { front_default: 'https://example.com/bulbasaur.png' },
    },
  ];

  it('renders the HomePage correctly', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <HomePage
            initialPokemons={mockInitialPokemons}
            totalPages={1}
            currentPage={1}
            search=""
          />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('renders no Pokemon found message when no pokemons are available', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <HomePage
            initialPokemons={[]}
            totalPages={0}
            currentPage={1}
            search=""
          />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByText(/no pokemon found/i)).toBeInTheDocument();
  });

  it('handles getServerSideProps correctly for search query', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            id: 1,
            name: 'bulbasaur',
            sprites: { front_default: 'https://example.com/bulbasaur.png' },
          }),
      })
    ) as jest.Mock;

    const context: Partial<GetServerSidePropsContext<ParsedUrlQuery>> = {
      query: { search: 'bulbasaur' },
    };
    const result = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    expect(result).toEqual({
      props: {
        initialPokemons: [
          {
            id: '1',
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
            sprites: { front_default: 'https://example.com/bulbasaur.png' },
          },
        ],
        totalPages: 1,
        currentPage: 1,
        search: 'bulbasaur',
      },
    });
  });

  it('handles getServerSideProps with pagination', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            results: [
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/',
              },
            ],
            count: 10,
          }),
      })
    ) as jest.Mock;

    const context: Partial<GetServerSidePropsContext<ParsedUrlQuery>> = {
      query: { page: '1' },
    };
    const result = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    expect(result).toEqual({
      props: {
        initialPokemons: [
          {
            name: 'bulbasaur',
            id: '1',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
            sprites: {
              front_default:
                'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
            },
          },
        ],
        totalPages: 1,
        currentPage: 1,
        search: '',
      },
    });
  });

  it('handles getServerSideProps with fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Failed to fetch'))
    ) as jest.Mock;

    const context: Partial<GetServerSidePropsContext<ParsedUrlQuery>> = {
      query: {},
    };
    const result = await getServerSideProps(
      context as GetServerSidePropsContext
    );

    expect(result).toEqual({
      props: {
        initialPokemons: [],
        totalPages: 0,
        currentPage: 1,
        search: '',
      },
    });
  });
});
