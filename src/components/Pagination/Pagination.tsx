import { Component } from 'react';
import { PaginationProps } from '../types';

class Pagination extends Component<PaginationProps> {
  handlePageChange = (page: number) => {
    this.props.onPageChange(page);
  };

  renderPages = () => {
    const { currentPage, totalPages } = this.props;
    const pagesToShow = 3;
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };

  render() {
    const { currentPage, totalPages } = this.props;

    return (
      <div className="pagination">
        <button
          onClick={() => this.handlePageChange(1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          {'<<'}
        </button>
        <button
          onClick={() => this.handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          {'<'}
        </button>
        {this.renderPages().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => this.handlePageChange(pageNumber)}
            className={
              pageNumber === currentPage
                ? 'active pagination-button'
                : 'pagination-button'
            }
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => this.handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          {'>'}
        </button>
        <button
          onClick={() => this.handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          {'>>'}
        </button>
      </div>
    );
  }
}

export default Pagination;
