import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupApiStore } from './test-utils';
import { apiSlice } from '../redux/slices/apiSlice';
import { selectItem } from '../redux/slices/selectedSlice';
import Flyout from '../components/Flyout/Flyout';

const { store } = setupApiStore(apiSlice);

describe('Flyout Component', () => {
  beforeEach(() => {
    store.dispatch(selectItem('1'));
  });

  test('renders the Flyout component with selected items', async () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    expect(screen.getByText(/1 pokemons are selected/i)).toBeInTheDocument();
  });

  test('unselect all button works correctly', async () => {
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText(/Unselect all/i));
    expect(screen.queryByText(/1 pokemons are selected/i)).toBeNull();
  });
});
