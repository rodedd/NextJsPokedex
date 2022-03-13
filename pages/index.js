import Layout from '../components/Layout';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import NavButtons from '../components/NavButtons';
import PokemonCard from '../components/PokemonCard';
import TypesFilter from '../components/TypesFilter';
import NoResults from '../components/NoResults';

import usePokemon from '../hooks/usePokemon';

export default function Home({ pokemonList }) {
  
  const {
    states,
    stateUpdaters,
  } = usePokemon({ pokemonList });

  const {
    listLimit,
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

      <Header />

      {/* Searchbar */}
      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
      />

      {/* Filter by types */}
      {(!searchValue.length >= 1) ? 
        <TypesFilter
          filteredPokemon={filteredPokemon}
          setFilteredPokemon={setFilteredPokemon}
          pokemonList={pokemonList}
        /> : null
      }

      {/* Display the pokemon cards */}
      {/* Display normal list */}
      {(!searchValue.length >= 1 && filteredPokemon.length === 0) ?
        <PokemonCard pokemonList={pokemonToShow}/> : null
      }

      {/* Display filtered by types list */}
      {(!searchValue.length >= 1 && filteredPokemon.length != 0) ? 
        <PokemonCard pokemonList={filteredPokemon}/> : null
      }

      {/* Display searched list */}
      {(searchValue.length >= 1 && searchedPokemon.length >= 1) ? 
        <PokemonCard pokemonList={searchedPokemon}/> : null
      }

      {/* No results */}
      {(searchValue.length >= 1 && searchedPokemon.length === 0) ? 
        <NoResults /> : null
      }
      
      {/* Display nav buttons only on the normal list */}
      {(!searchValue.length >= 1 && filteredPokemon.length === 0) ?
        <NavButtons
          previousPage={previousPage}
          nextPage={nextPage}
          listLimit={listLimit}
          fullListLength={pokemonList.length}
        /> : null
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