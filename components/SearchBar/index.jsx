import React from 'react';

const SearchBar = ({ searchValue, onSearchValueChange }) => {

  return (
    <div className='w-full h-10 max-w-2xl mx-auto text-center rounded-md'>
      <input 
        className='w-full h-10 text-center rounded-md ring-2 ring-gray-300 placeholder:text-lg placeholder:italic placeholder:text-gray-400 focus:outline-none focus:ring-gray-800'
        placeholder="&#8981; Buscar..."
        value={searchValue}
        onChange={onSearchValueChange}
      />
    </div>
  );
};

export default SearchBar;