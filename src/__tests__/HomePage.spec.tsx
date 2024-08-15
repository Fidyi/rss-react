import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';

import { useRouter } from 'next/router';
import store from '../redux/store';
import HomePage from '../../pages';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;

describe('HomePage Component', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: {},
      push: jest.fn(),
    });
  });

  test('renders SimulateErrorButton component', async () => {
    render(
      <Provider store={store}>
        <HomePage
          initialPokemons={[]}
          totalPages={1}
          currentPage={1}
          search=""
        />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Simulate Error/i)).toBeInTheDocument();
    });
  });
});
