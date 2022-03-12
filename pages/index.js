import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import PokemonCard from '../components/PokemonCard';

export default function Home({ pokemonList }) {

  console.log(pokemonList)
  const pokemonLimit = 20;

  const [listStart, setListStart] = useState(0);
  const [listEnd, setListEnd] = useState(pokemonLimit);
  const [pokemonToShow, setPokemonToShow] = useState(pokemonList.slice(listStart, listEnd));
  const [searchValue, setSearchValue] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

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

  const nextPage = () => {
    setListStart(listStart + pokemonLimit);
    setListEnd(listEnd + pokemonLimit);
    setPokemonToShow(pokemonList.slice((listStart + pokemonLimit), (listEnd + pokemonLimit)))
  }

  const previousPage = () => {
    if(listStart != 0) {
      setListStart(listStart - pokemonLimit);
      setListEnd(listEnd - pokemonLimit);
      setPokemonToShow(pokemonList.slice((listStart - pokemonLimit), (listEnd - pokemonLimit)))
    }
  }

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value)
  }

  let searchedPokemon = [];

  if(!searchValue.length >= 1) {
    searchedPokemon = pokemonToShow;
  } else {
    searchedPokemon = pokemonList.filter(pokemon => {
      const pokemonNameLowerCase = pokemon.name.toLowerCase();
      const searchedPokemonLowerCase = searchValue.toLowerCase();
      return pokemonNameLowerCase.includes(searchedPokemonLowerCase);
    });
  };

  const filterByType = (type) => {
    setFilteredPokemon(pokemonList.filter(pokemon => (pokemon.types[0] === type || pokemon.types[1] === type)))
  }

  const clearFilter = () => {
    setFilteredPokemon([]);
  }
  
  return (
    <Layout title='Pokédex'>

      <div className='w-full flex items-center justify-center space-x-2 my-8'>
        <Image src="/icons8-pokeball-50.png" alt="Pokedex icono" width={30} height={30} layout='fixed' />
        <h1 className='text-3xl font-bold'>Pokédex</h1>
      </div>

      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
      />

      {/* Filter by types */}
        {(!searchValue.length >= 1) &&
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
        }

      {/* Display the pokemon cards */}
      <ul className='w-full max-w-2xl space-y-4 my-8 mx-auto'>

        {(!searchValue.length >= 1 && filteredPokemon.length === 0) && pokemonToShow.map((poke) => (
          <li key={poke.id}>
            <Link href={`/pokemon?id=${poke.id}`}>
              <a>
                <PokemonCard poke={poke}/>
              </a>
            </Link>
          </li>
        ))}

        {(!searchValue.length >= 1 && filteredPokemon.length != 0) && filteredPokemon.map((poke) => (
          <li key={poke.id}>
            <Link href={`/pokemon?id=${poke.id}`}>
              <a>
                <PokemonCard poke={poke} />
              </a>
            </Link>
          </li>
        ))}

        {(searchValue.length >= 1) && searchedPokemon.map((poke) => (
          <li key={poke.id}>
            <Link href={`/pokemon?id=${poke.id}`}>
              <a>
                <PokemonCard poke={poke} />
              </a>
            </Link>
          </li>
        ))}

        {(searchValue.length >= 1 && searchedPokemon.length === 0) && 
          <li className='w-full h-full text-center text-xl'>
            Ningún resultado coincide con tu búsqueda :(
          </li>
        }

        
      </ul>
      
      {(!searchValue.length >= 1 && filteredPokemon.length === 0) &&
        <NavButtons
          previousPage={previousPage}
          nextPage={nextPage}
          listStart={listStart}
          listEnd={listEnd}
          fullListLength={pokemonList.length}
        />
      }
    </Layout>
  );
};

export async function getStaticProps() {
  try {

    let pokemonArray = [];
    const pokemonNumber = 898;

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
        name: pokemon.species.name,
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