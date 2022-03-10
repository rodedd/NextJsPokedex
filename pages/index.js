import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Home({ pokemonList }) {

  const [listStart, setListStart] = useState(0);
  const [listEnd, setListEnd] = useState(20);
  const [ pokemonList20, setPokemonList20 ] = useState(pokemonList.slice(listStart, listEnd));

  const nextPage = () => {
    setListStart(listStart + 20);
    setListEnd(listEnd + 20);
    setPokemonList20(pokemonList.slice((listStart + 20), (listEnd + 20)))
  }

  const previousPage = () => {
    if(listStart != 0) {
      setListStart(listStart - 20);
      setListEnd(listEnd - 20);
      setPokemonList20(pokemonList.slice((listStart - 20), (listEnd - 20)))
    }
  }

  return (
    <Layout title='Pokédex'>

      <div className='w-full flex items-center justify-center space-x-2 mt-8'>
        <Image src="/icons8-pokeball-50.png" alt="Pokedex icono" width={30} height={30} layout='fixed' />
        <h1 className='text-3xl font-bold'>Pokédex</h1>
      </div>

      <ul className='w-full max-w-2xl space-y-4 my-8 mx-auto'>
        {pokemonList20.map((poke) => (
          <li key={poke.id}>
            <Link href={`/pokemon?id=${poke.id}`}>
              <a>
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
              </a>
            </Link>
          </li>
        ))}
      </ul>

      <div className='w-full justify-between flex mb-8'>
        {listStart != 0 ? 
          <button onClick={previousPage} className='bg-gray-800 text-white rounded-md py-2 hover:bg-black hover:text-white px-3'>
            <div className="flex flex-row align-middle">
              <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-2">Prev</span>
            </div>
          </button> 
        :
          <button disabled onClick={previousPage} className='bg-gray-800 text-white rounded-md py-2 hover:bg-black hover:text-white px-3 disabled:opacity-50 disabled:hover:bg-gray-800'>
            <div className="flex flex-row align-middle">
              <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-2">Prev</span>
            </div>
          </button> 
        }

        {listEnd != 40 ?
          <button onClick={nextPage} className='bg-gray-800 text-white rounded-md py-2 hover:bg-black hover:text-white px-3'>
            <div className="flex flex-row align-middle">
              <span className="mr-2">Next</span>
              <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </button>
        :
          <button disabled onClick={nextPage} className='bg-gray-800 text-white rounded-md py-2 hover:bg-black hover:text-white px-3 disabled:opacity-50 disabled:hover:bg-gray-800'>
            <div className="flex flex-row align-middle">
              <span className="mr-2">Next</span>
              <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </button>
        }
      </div>

    </Layout>
  );
};

export async function getStaticProps() {
  try {
    let pokemonArray = [];
    const pokemonNumber = 40;

    const getPokemon = async (id) => {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
      const res = await fetch(url);
      const pokemonData = await res.json();
      return pokemonData;
    };
    
    for (let i = 1; i <= pokemonNumber; i++) {
      let pokemon = await getPokemon(i);
      pokemonArray.push(pokemon);
    };
  
    let pokemonList = pokemonArray.map((pokemon, index) => {
      const imageUrl = pokemon.sprites.other.home.front_default ? pokemon.sprites.other.home.front_default : '/toppng.com-3d-question-mark-png-512x512.png';

      return {
        id: pokemon.id,
        name: pokemon.name,
        image: imageUrl,
        types: pokemon.types.map(type => type.type.name),
      }
    });
    
  return {
    props: { pokemonList },
  };
  
  } catch (error) {
    console.error(error);
  }
};