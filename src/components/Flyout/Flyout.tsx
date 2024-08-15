import React from 'react';
import saveAs from 'file-saver';
import { PokemonDetail } from '../types';

type FlyoutProps = {
  detailedPokemons: PokemonDetail[];
  selectedItems: string[];
  onUnselectAll: () => void;
};

const Flyout: React.FC<FlyoutProps> = ({
  detailedPokemons,
  selectedItems,
  onUnselectAll,
}) => {
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
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 shadow-md flex justify-between items-center">
      <span>{`${selectedItems.length} pokemons are selected`}</span>
      <div>
        <button
          className="ml-2 px-4 py-2 text-white bg-red-500 rounded"
          onClick={onUnselectAll}
        >
          Unselect all
        </button>
        <button
          className="ml-2 px-4 py-2 text-white bg-blue-500 rounded"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
