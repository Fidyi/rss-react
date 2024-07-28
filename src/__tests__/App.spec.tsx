import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { RootState } from '../redux/store';

const mockStore = configureStore<RootState>([]);
let store: MockStoreEnhanced<RootState>;

beforeEach(() => {
  store = mockStore({
    search: {
      searchTerm: '',
      searchHistory: [],
    },
  });
});

test('renders the app', () => {
  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );

  expect(screen.getByPlaceholderText(/Search Pokemon.../i)).toBeInTheDocument();
  expect(screen.getByText(/Simulate Error/i)).toBeInTheDocument();
});
