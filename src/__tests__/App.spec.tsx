import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import { setupApiStore } from './test-utils';
import { apiSlice } from '../redux/apiSlice';

const { store } = setupApiStore(apiSlice);

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
