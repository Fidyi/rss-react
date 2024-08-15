import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import SearchHistory from '../components/SearchHistory/SearchHistoryProps';
import { setSearchTerm } from '../redux/slices/searchSlice';
import store from '../redux/store';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe('SearchHistory Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: jest.fn(),
      query: {},
    });

    store.dispatch(setSearchTerm('Pikachu'));
    store.dispatch(setSearchTerm('Bulbasaur'));
  });

  test('renders search history', async () => {
    render(
      <Provider store={store}>
        <SearchHistory />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
      expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    });
  });

  test('clicking on history item sets search term', async () => {
    render(
      <Provider store={store}>
        <SearchHistory />
      </Provider>
    );

    fireEvent.click(screen.getByText('Pikachu'));

    await waitFor(() => {
      expect(store.getState().search.searchTerm).toBe('Pikachu');
    });

    expect(mockUseRouter().push).toHaveBeenCalledWith('/?search=Pikachu');
  });
});
