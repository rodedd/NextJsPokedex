import React from 'react';

const TypesFilter = ({ filteredPokemon, setFilteredPokemon, pokemonList }) => {
  const typesData = [
    'normal',
    'grass',
    'water',
    'fire',
    'electric',
    'flying',
    'fighting',
    'psychic',
    'dark',
    'ghost',
    'ice',
    'dragon',
    'ground',
    'rock',
    'bug',
    'poison',
    'steel',
    'fairy',
  ]

  const filterByType = (type) => {
    setFilteredPokemon(pokemonList.filter(pokemon => (pokemon.types[0] === type || pokemon.types[1] === type)))
  }

  const clearFilter = () => {
    setFilteredPokemon([]);
  }

  return (
    <div className='w-full max-w-2xl mx-auto my-8'>
      <div className='flex justify-between items-center'>
        <p className='font-medium'>Filter by type</p>
        {filteredPokemon.length != 0 &&
          <span onClick={clearFilter} className='text-sm text-red-500 ring-2 ring-red-500 rounded-full px-2 cursor-pointer'>Clear filters <span>&#10754;</span></span>
        }
      </div>
      <ul className='flex w-full py-4 space-x-2 overflow-x-scroll'>
        {typesData.map((type) => (
          <li
            key={type}
            className='flex-none w-20 text-center text-xs text-black font-semibold rounded-full px-4 pt-[4px] pb-[6px] capitalize cursor-pointer'
            style={{ backgroundColor: `var(--${type})`}}
            onClick={() => filterByType(type)}
          >
            {type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypesFilter;