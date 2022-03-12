import { useState } from "react";

const usePokemon = ({ pokemonList }) => {
  const pokemonLimit = 20;

  const [listStart, setListStart] = useState(0);
  const [listEnd, setListEnd] = useState(pokemonLimit);
  const [pokemonToShow, setPokemonToShow] = useState(pokemonList.slice(listStart, listEnd));
  const [searchValue, setSearchValue] = useState('');
  const [filteredPokemon, setFilteredPokemon] = useState([]);

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

  const states = {
    listStart,
    listEnd,
    pokemonToShow,
    searchValue,
    filteredPokemon,
    searchedPokemon,
  };

  const stateUpdaters = {
    setFilteredPokemon,
    nextPage,
    previousPage,
    onSearchValueChange,
  }

  return { states, stateUpdaters };
};

export default usePokemon;