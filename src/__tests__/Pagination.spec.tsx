import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination from '../components/Pagination/Pagination';

test('updates URL query parameter when page changes', () => {
  const handlePageChange = jest.fn();

  render(
    <MemoryRouter initialEntries={['/?page=1']}>
      <Pagination
        currentPage={1}
        totalPages={3}
        onPageChange={handlePageChange}
      />
    </MemoryRouter>
  );

  const pageButton = screen.getByText('2');
  fireEvent.click(pageButton);

  expect(handlePageChange).toHaveBeenCalledWith(2);
});
