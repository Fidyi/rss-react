import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { selectItem } from '../redux/slices/selectedSlice';
import Flyout from '../components/Flyout/Flyout';

describe('Flyout Component', () => {
  it('unselect all button works correctly', async () => {
    store.dispatch(selectItem('1'));
    store.dispatch(selectItem('2'));

    render(
      <Provider store={store}>
        <Flyout
          detailedPokemons={[]}
          selectedItems={store.getState().selected.selectedItems}
          onUnselectAll={() =>
            store.dispatch({ type: 'selected/clearSelections' })
          }
        />
      </Provider>
    );

    expect(screen.getByText(/pokemons are selected/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Unselect all/i));

    await waitFor(() => {
      expect(screen.queryByText(/pokemons are selected/i)).toBeInTheDocument();
    });
  });
});
