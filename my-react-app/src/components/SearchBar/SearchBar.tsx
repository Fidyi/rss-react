import { Component, ChangeEvent } from 'react';
import { SearchBarProps, SearchBarState } from '../types';

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = {
      searchTerm: props.searchTerm || '',
    };
  }

  componentDidUpdate(prevProps: SearchBarProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.setState({ searchTerm: this.props.searchTerm });
    }
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    this.props.onSearch(this.state.searchTerm);
  };

  render() {
    const { searchTerm } = this.state;

    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
