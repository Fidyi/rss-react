import { Component } from 'react';
import PokemonList from './components/PokemonList/PokemonList';
import Pagination from './components/Pagination/Pagination';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Pokemon } from './components/types';
import './App.css';

type AppState = {
  searchTerm: string;
  pokemons: Pokemon[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
};

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchTerm: '',
      pokemons: [],
      currentPage: 1,
      totalPages: 0,
      isLoading: false,
      error: null,
    };
  }

  componentDidMount() {
    const searchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm }, () => {
      if (searchTerm) {
        this.fetchData(searchTerm);
      } else {
        this.fetchData();
      }
    });
  }

  handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.setState({ searchTerm: term, currentPage: 1, isLoading: true }, () =>
      this.fetchData(term)
    );
  };

  fetchData = (term?: string) => {
    this.setState({ isLoading: true });
    const { currentPage } = this.state;
    const limit = 10;
    const offset = (currentPage - 1) * limit;

    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    if (term) {
      url = `https://pokeapi.co/api/v2/pokemon/${term.toLowerCase()}`;
    }

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        let pokemons: Pokemon[] = [];
        let totalPages = 0;

        if (term) {
          if (data.id) {
            pokemons = [
              {
                id: String(data.id),
                name: data.name,
              },
            ];
            totalPages = 1;
          } else {
            throw new Error(`Pokemon "${term}" not found.`);
          }
        } else {
          pokemons = data.results.map(
            (pokemon: { name: string; url: string }) => ({
              id: pokemon.url.split('/').filter(Boolean).pop() || '',
              name: pokemon.name,
            })
          );
          totalPages = Math.ceil(data.count / limit);
        }

        this.setState({ pokemons, totalPages, isLoading: false, error: null });
      })
      .catch((error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page }, () =>
      this.fetchData(this.state.searchTerm)
    );
  };

  simulateError = () => {
    this.errorBoundaryRef?.handleSimulatedError();
  };

  private errorBoundaryRef: ErrorBoundary | null = null;

  render() {
    const { searchTerm, pokemons, currentPage, totalPages, isLoading, error } =
      this.state;

    return (
      <div className="App">
        <ErrorBoundary ref={(ref) => (this.errorBoundaryRef = ref)}>
          <SearchBar searchTerm={searchTerm} onSearch={this.handleSearch} />
          <button onClick={this.simulateError}>Simulate Error</button>
          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Pocemon not found(((</div>
          ) : (
            <>
              <PokemonList pokemons={pokemons} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={this.handlePageChange}
              />
            </>
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
