import { Component } from 'react';
import PokemonList from './components/PokemonList/PokemonList';
import Pagination from './components/Pagination/Pagination';
import SearchBar from './components/SearchBar/SearchBar';
import { Pokemon } from './components/types';

type AppState = {
  searchTerm: string;
  pokemons: Pokemon[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
};

class App extends Component<string, AppState> {
  constructor(props: string) {
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
    this.setState({ searchTerm }, this.fetchData);
  }

  handleSearch = (term: string) => {
    localStorage.setItem('searchTerm', term);
    this.setState({ searchTerm: term, currentPage: 1 }, this.fetchData);
  };

  fetchData = () => {
    this.setState({ isLoading: true, error: null });
    const { searchTerm, currentPage } = this.state;
    const limit = 10;
    const offset = (currentPage - 1) * limit;

    let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    if (searchTerm) {
      url = `https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`;
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

        if (searchTerm) {
          if (data.id) {
            pokemons = [
              {
                id: String(data.id),
                name: data.name,
              },
            ];
          }
          totalPages = 1;
        } else {
          pokemons = data.results.map(
            (pokemon: { name: string; url: string }) => {
              const id = pokemon.url.split('/').filter(Boolean).pop();
              return {
                id: String(id),
              };
            }
          );
          totalPages = Math.ceil(data.count / limit);
        }

        this.setState({ pokemons, totalPages, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page }, this.fetchData);
  };

  render() {
    const { searchTerm, pokemons, currentPage, totalPages, isLoading, error } =
      this.state;

    return (
      <div className="App">
        <SearchBar searchTerm={searchTerm} onSearch={this.handleSearch} />
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <div>
            <PokemonList pokemons={pokemons} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={this.handlePageChange}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
