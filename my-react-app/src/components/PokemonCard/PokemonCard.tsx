import { Component } from 'react';
import { PokemonCardProps } from '../types';

class PokemonCard extends Component<PokemonCardProps> {
  render() {
    const { imageUrl, name } = this.props;

    return (
      <div className="pokemon-card">
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
      </div>
    );
  }
}

export default PokemonCard;
