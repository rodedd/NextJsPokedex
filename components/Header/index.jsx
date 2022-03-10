import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <header>
      <nav>
        <div className='flex items-center justify-center py-2'>
          <Image src="/icons8-pokeball-50.png" alt="Pokedex icono" width={30} height={30} layout='fixed' />
          <h1 className='text-3xl font-bold'>Pokédex</h1>
        </div>
      </nav>
    </header>
  );
};

export default Header;