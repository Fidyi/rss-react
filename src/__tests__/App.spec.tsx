import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail';

test('renders the app', () => {
  render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details/:id" element={<PokemonDetail />} />
      </Routes>
    </Router>
  );

  expect(screen.getByPlaceholderText(/Search Pokemon.../i)).toBeInTheDocument();
  expect(screen.getByText(/Simulate Error/i)).toBeInTheDocument();
});
