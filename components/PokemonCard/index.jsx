import React from 'react';
import Image from 'next/image';

const PokemonCard = ({ poke }) => {
  return (
    <div className={`poke-card grid grid-cols-3 w-full h-[130px] p-3 rounded-2xl text-white shadow-md overflow-hidden`} style={{ background: `linear-gradient(169deg, var(--${poke.types[0]}) 50%, ${poke.types[1] ? `var(--${poke.types[1]}) 50%` : `var(--${poke.types[0]}) 50%`})` }}>

      <div className='col-span-2 flex flex-col justify-between'>
        <div className='font-bold text-lg'>
          <span>#{poke.id.toString().padStart(3, 0)}</span>
          <h2 className='capitalize'>{poke.name}</h2>
        </div>
        <ul className='flex space-x-1'>
          {poke.types.map((type) => (
            <li key={type} className='w-20 text-center text-xs font-semibold bg-black/50 rounded-full px-3 pt-[4px] pb-[6px] capitalize'>{type}</li>
          ))}
        </ul>
      </div>

      <div className='z-10 relative justify-self-end w-[106px] h-[106px]'>
        <Image src={poke.image} alt={poke.name} layout='fill' />
      </div>

    </div>
  )
}

export default PokemonCard;