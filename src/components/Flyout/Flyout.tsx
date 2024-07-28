import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelections } from '../../redux/slices/selectedSlice';
import { RootState } from '../../redux/store';
import saveAs from 'file-saver';
import './flyout.css';
import { PokemonDetail } from '../types';

const Flyout: React.FC = () => {
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.selected.selectedItems
  );
  const [detailedPokemons, setDetailedPokemons] = useState<PokemonDetail[]>([]);

  useEffect(() => {
    const fetchDetailedPokemons = async () => {
      const promises = selectedItems.map((id) => fetchPokemonDetail(id));
      const results = await Promise.all(promises);
      setDetailedPokemons(results.filter(Boolean) as PokemonDetail[]);
    };

    fetchDetailedPokemons();
  }, [selectedItems]);

  const fetchPokemonDetail = async (
    id: string
  ): Promise<PokemonDetail | null> => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data: PokemonDetail = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching Pokémon details:', error);
      return null;
    }
  };

  const handleUnselectAll = () => {
    dispatch(clearSelections());
  };

  const handleDownload = () => {
    const csvHeader =
      'Name,Height,Weight,Base Experience,Types,Abilities,Stats,URL\n';
    const csvRows = detailedPokemons
      .map((p) =>
        [
          p.name,
          p.height,
          p.weight,
          p.base_experience,
          p.types.map((t) => t.type.name).join('|'),
          p.abilities.map((a) => a.ability.name).join('|'),
          p.stats.map((s) => `${s.stat.name}:${s.base_stat}`).join('|'),
          `https://pokeapi.co/api/v2/pokemon/${p.id}/`,
        ].join(',')
      )
      .join('\n');

    const csvContent = csvHeader + csvRows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${selectedItems.length}_selected_items.csv`);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="flyout">
      <span>{`${selectedItems.length} pokemons are selected`}</span>
      <button onClick={handleUnselectAll}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
