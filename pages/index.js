import Image from 'next/image';
import Link from 'next/link';

import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import PokemonCard from '../components/PokemonCard';
import TypesFilter from '../components/TypesFilter';

import usePokemon from '../hooks/usePokemon';
import NoResults from '../components/NoResults';

export default function Home({ pokemonList }) {

  console.log(pokemonList)
  
  const {
    states,
    stateUpdaters,
  } = usePokemon({ pokemonList });

  const {
    listStart,
    listEnd,
    pokemonToShow,
    searchValue,
    filteredPokemon,
    searchedPokemon,
  } = states;

  const {
    setFilteredPokemon,
    nextPage,
    previousPage,
    onSearchValueChange,
  } = stateUpdaters;
  
  return (
    <Layout title='Pokédex'>

      <div className='w-full flex items-center justify-center space-x-2 my-8'>
        <Image src="/icons8-pokeball-50.png" alt="Pokedex icono" width={30} height={30} layout='fixed' />
        <h1 className='text-3xl font-bold'>Pokédex</h1>
      </div>

      {/* Searchbar */}
      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
      />

      {/* Filter by types */}
      {(!searchValue.length >= 1) && 
        <TypesFilter
          filteredPokemon={filteredPokemon}
          setFilteredPokemon={setFilteredPokemon}
          pokemonList={pokemonList}
        />
      }

      {/* Display the pokemon cards */}
      <ul className='w-full max-w-2xl space-y-4 my-8 mx-auto'>

        {/* Display normal list */}
        {(!searchValue.length >= 1 && filteredPokemon.length === 0) && pokemonToShow.map((poke) => (
          <li key={poke.id}>
            <Link href={`/pokemon?id=${poke.id}`}>
              <a>
                <PokemonCard poke={poke}/>
              </a>
            </Link>
          </li>
        ))}

        {/* Display filtered by types list */}
        {(!searchValue.length >= 1 && filteredPokemon.length != 0) && filteredPokemon.map((poke) => (
          <li key={poke.id}>
            <Link href={`/pokemon?id=${poke.id}`}>
              <a>
                <PokemonCard poke={poke} />
              </a>
            </Link>
          </li>
        ))}

        {/* Display searched list */}
        {(searchValue.length >= 1) && searchedPokemon.map((poke) => (
          <li key={poke.id}>
            <Link href={`/pokemon?id=${poke.id}`}>
              <a>
                <PokemonCard poke={poke} />
              </a>
            </Link>
          </li>
        ))}

        {/* No results */}
        {(searchValue.length >= 1 && searchedPokemon.length === 0) && 
          <NoResults />
        }

      </ul>
      
      {/* Display nav buttons only on the normal list */}
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
    const pokemonNumber = 50;

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