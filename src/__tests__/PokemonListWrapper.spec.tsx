import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import PokemonListWrapper from '../components/PokemonList/PokemonListWrapper';
import { RootState } from '../redux/store';

const mockStore = configureStore<RootState>([]);
let store: MockStoreEnhanced<RootState>;

beforeEach(() => {
  store = mockStore({
    search: {
      searchTerm: 'test',
      searchHistory: [],
    },
  });
});

test('renders PokemonListWrapper', () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <PokemonListWrapper />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
