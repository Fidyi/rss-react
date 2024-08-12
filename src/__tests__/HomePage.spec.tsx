import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupApiStore } from './test-utils';
import HomePage from '../../app/page';
import { apiSlice } from '../redux/slices/apiSlice';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const { store } = setupApiStore(apiSlice);

describe('HomePage Component', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      query: {},
      push: jest.fn(),
      prefetch: jest.fn(),
      pathname: '/',
    });
  });

  test('renders HomePage components', async () => {
    console.log('Rendering HomePage component...');

    render(
      <Provider store={store}>
        <HomePage />
      </Provider>
    );
  });
});
