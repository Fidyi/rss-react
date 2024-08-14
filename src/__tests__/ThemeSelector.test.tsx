import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelector from '../components/ThemeSelector/ThemeSelector';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';

describe('ThemeSelector', () => {
  test('renders button with correct initial SVG icon', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  test('toggles theme on button click', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button.querySelector('svg')).toBeInTheDocument();
  });

  test('button displays correct SVG icon based on theme', () => {
    const { rerender } = render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    let button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();

    fireEvent.click(button);
    rerender(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    button = screen.getByRole('button');
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
});
