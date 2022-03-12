import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header>
      <div className='w-full flex items-center justify-center space-x-2 my-8'>
        <Image src="/icons8-pokeball-50.png" alt="Pokedex icono" width={30} height={30} layout='fixed' />
        <h1 className='text-3xl font-bold'>Pokédex</h1>
      </div>
    </header>
  );
};

export default Header;