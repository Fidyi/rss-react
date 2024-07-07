import { Component } from 'react';
import { PokemonCardProps } from '../types';

class PokemonCard extends Component<PokemonCardProps> {
  render() {
    const { id, name } = this.props;
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <div className="pokemon-card">
        <img src={imageUrl} alt={name} />
        <h3>{name}</h3>
      </div>
    );
  }
}

export default PokemonCard;
