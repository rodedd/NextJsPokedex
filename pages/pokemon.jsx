import Image from 'next/image';
import React from 'react';
import Layout from '../components/Layout';

const pokemon = ({ pokemonData }) => {
  const isFemale = pokemonData.gender_rate > 0;
  const isMale = pokemonData.gender_rate >= 0 && pokemonData.gender_rate < 8;

  const statsNames = ['hp', 'attack', 'defense', 'sp. atk', 'sp. def', 'speed'];

  const statsPercentage = (number) => Math.trunc((number * 100) / 255);

  const capitalize = (word) => {
    return word.split('')
      .map((letter, index) =>
        index ? letter.toLowerCase() : letter.toUpperCase(),
      )
      .join('');
  };  

  return (
    <Layout title={capitalize(pokemonData.name)}>
      <div className='w-full flex flex-col items-center'>

        <div className='relative w-full flex flex-col items-center'>
          <div className={`poke-bg-circle shadow-lg`} style={{ background: `linear-gradient(90deg, var(--${pokemonData.types[0]}) 50%, ${pokemonData.types[1] ? `var(--${pokemonData.types[1]}) 50%` : `var(--${pokemonData.types[0]}) 50%`})` }}></div>

          {/* Name */}
          <div className='w-full flex justify-center items-center text-white mb-6 pt-6 z-10'>
            <h1 className='capitalize text-3xl font-bold'>{pokemonData.name} <span className='text-xl font-semibold'>#{pokemonData.id.toString().padStart(3, 0)}</span></h1>
            
          </div>

          {/* Image */}
          <div className='relative w-72 h-72 mb-6 z-10'>
            <Image src={pokemonData.image} alt={pokemonData.name} layout='fill' />
          </div>
        </div>

        {/* Types */}
        <div className='flex justify-center w-full max-w-md text-center space-x-8 mb-6'>
          {pokemonData.types.map((type, index) => (
            <span key={index} className={`inline-block w-1/2 py-1 rounded-full text-white font-semibold capitalize background-${type}`}>{type}</span>
          ))}
        </div>

        {/* Description */}
        <div className='mb-6 max-w-md text-lg text-center'>
          <p>{pokemonData.flavor_text_entry}</p>
        </div>

        {/* Information */}
        <div className='w-full max-w-md mb-6 flex flex-col space-y-3 text-center'>
          <div className={`flex justify-between text-color-${pokemonData.types[0]}`}>
            <div className='flex flex-col w-1/3'>
              <p className='font-semibold'>{pokemonData.category.slice(0, -8)}</p>
              <p className='text-xs text-gray-400'>Category</p>
            </div>
            <div className='flex flex-col w-1/3 border-x-2 border-slate-300'>
              <p className='font-semibold'>{pokemonData.height/10} m</p>
              <p className='text-xs text-gray-400'>Height</p>
            </div>
            <div className='flex flex-col w-1/3'>
              <p className='font-semibold'>{pokemonData.weight/10} kg</p>
              <p className='text-xs text-gray-400'>Weight</p>
            </div>
          </div>

          <div className={`flex justify-between text-color-${pokemonData.types[0]}`}>

            <div className='flex flex-col w-1/2 border-r-2 border-slate-300'>
              <p className='font-semibold capitalize'>{pokemonData.abilities[0]}</p>
              <p className='text-xs text-gray-400'>Ability</p>
            </div>

            <div className='flex flex-col items-center w-1/2'>
              {/* <p className='font-semibold'>{(pokemonData.gender_rate/8)*100}</p> */}
              <div>
                {(isMale && isFemale) ? 
                  <div className='flex space-x-2'>
                    <svg width="24px" height="24px" viewBox="-2.5 -2.5 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className={`fill-color-${pokemonData.types[0]}`}>
                      <path d='M4.364 14.636a5 5 0 1 0 7.071-7.071 5 5 0 0 0-7.071 7.071zm7.728-9.142l2.553-2.553h-1.517a1 1 0 0 1 0-2h4a.997.997 0 0 1 1 1v4a1 1 0 1 1-2 0V4.286l-2.622 2.622A7.002 7.002 0 0 1 2.95 16.05a7 7 0 0 1 9.142-10.556z'/>
                    </svg>
                    <svg width="24px" height="24px" viewBox="-5 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className={`fill-color-${pokemonData.types[0]}`}>
                      <path d='M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zm1 4h1a1 1 0 0 1 0 2H8v1a1 1 0 0 1-2 0v-1H5a1 1 0 0 1 0-2h1v-2c0-.024 0-.047.002-.07A7.002 7.002 0 0 1 7 0a7 7 0 0 1 .998 13.93L8 14v2z'/>
                    </svg>
                  </div> 
                : (isMale && !isFemale) ?
                  <div>
                    <svg width="24px" height="24px" viewBox="-2.5 -2.5 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className={`fill-color-${pokemonData.types[0]}`}>
                      <path d='M4.364 14.636a5 5 0 1 0 7.071-7.071 5 5 0 0 0-7.071 7.071zm7.728-9.142l2.553-2.553h-1.517a1 1 0 0 1 0-2h4a.997.997 0 0 1 1 1v4a1 1 0 1 1-2 0V4.286l-2.622 2.622A7.002 7.002 0 0 1 2.95 16.05a7 7 0 0 1 9.142-10.556z'/>
                    </svg>
                  </div>
                : (!isMale && isFemale) ?
                  <div>
                    <svg width="24px" height="24px" viewBox="-5 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" className={`fill-color-${pokemonData.types[0]}`}>
                      <path d='M7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10zm1 4h1a1 1 0 0 1 0 2H8v1a1 1 0 0 1-2 0v-1H5a1 1 0 0 1 0-2h1v-2c0-.024 0-.047.002-.07A7.002 7.002 0 0 1 7 0a7 7 0 0 1 .998 13.93L8 14v2z'/>
                    </svg>
                  </div> 
                : <p className='font-semibold'>Unknown</p>
                }
              </div>
              <p className='text-xs text-gray-400'>Gender</p>
            </div>
          </div>
        </div>

        {/* stats */}
        <div className='mb-6 w-full max-w-md text-center'>
          <p className={`text-lg font-semibold text-color-${pokemonData.types[0]} mb-2`}>Base Stats</p>
          <div className='flex flex-col'>
            {pokemonData.stats.map((stat, index) => (
              <div key={stat.stat.name} className='flex justify-between items-center'>
                <span className={`text-right w-4/12 border-r-2 px-2 uppercase text-sm text-color-${pokemonData.types[0]}`}>{statsNames[index]}</span>
                <span className={`text-right text-xs w-1/12 px-2 text-color-${pokemonData.types[0]}`}>{stat.base_stat}</span>
                <div className="rounded-full w-8/12 h-2.5 bg-gray-300 ml-2">
                  <div className={`background-${pokemonData.types[0]} h-2.5 rounded-full`} style={{ width: `${statsPercentage(stat.base_stat)}%`}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query }) {
  const id = query.id;

  try {
    const pokemonRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const speciesRes = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);

    const pokemonJSON = await pokemonRes.json();
    const { genera, gender_rate, flavor_text_entries } = await speciesRes.json();
    const imageUrl = pokemonJSON.sprites.other.home.front_default ? pokemonJSON.sprites.other.home.front_default : '/toppng.com-3d-question-mark-png-512x512.png';

    const pokemonData = {
      id: pokemonJSON.id,
      name: pokemonJSON.name,
      image: imageUrl,
      types: pokemonJSON.types.map(type => type.type.name),
      weight: pokemonJSON.weight,
      height: pokemonJSON.height,
      abilities: pokemonJSON.abilities.map(ability => ability.ability.name),
      stats: pokemonJSON.stats,
      category: genera[7].genus,
      gender_rate,
      flavor_text_entry: flavor_text_entries[0].flavor_text.replace('\u000c', ' '),
    };
    
    return {
      props: {pokemonData},
    }

  } catch (err) {
    console.error(err);
  }
};

export default pokemon;