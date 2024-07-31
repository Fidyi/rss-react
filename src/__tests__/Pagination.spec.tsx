import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination/Pagination';

describe('Pagination Component', () => {
  const handlePageChange = jest.fn();

  test('renders pagination buttons correctly', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('>')).toBeInTheDocument();
    expect(screen.getByText('>>')).toBeInTheDocument();
  });

  test('handles page change correctly', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('3'));
    expect(handlePageChange).toHaveBeenCalledWith(3);
  });

  test('disables previous buttons on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('<<')).toBeDisabled();
    expect(screen.getByText('<')).toBeDisabled();
  });

  test('disables next buttons on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('>>')).toBeDisabled();
    expect(screen.getByText('>')).toBeDisabled();
  });

  test('renders fewer pages correctly when totalPages is less than pagesToShow', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={2}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).toBeNull();
  });

  test('renders correct pages near the end', () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('renders correct pages near the beginning', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('handles single page correctly', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={handlePageChange}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeNull();
    expect(screen.getByText('<<')).toBeDisabled();
    expect(screen.getByText('<')).toBeDisabled();
    expect(screen.getByText('>')).toBeDisabled();
    expect(screen.getByText('>>')).toBeDisabled();
  });

  test('calls onPageChange with correct page number when clicking next and previous buttons', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('>'));
    expect(handlePageChange).toHaveBeenCalledWith(3);

    fireEvent.click(screen.getByText('<'));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });

  test('calls onPageChange with correct page number when clicking first and last buttons', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    );

    fireEvent.click(screen.getByText('<<'));
    expect(handlePageChange).toHaveBeenCalledWith(1);

    fireEvent.click(screen.getByText('>>'));
    expect(handlePageChange).toHaveBeenCalledWith(5);
  });
});
