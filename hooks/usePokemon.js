import { useState, useEffect } from "react";

const usePokemon = ({ pokemonList }) => {
  const pokemonLimit = 20;

  const [listLimit, setListLimit] = useState([0, pokemonLimit]);
  const [pokemonToShow, setPokemonToShow] = useState(pokemonList.slice(listLimit[0], listLimit[1]));
  const [searchValue, setSearchValue] = useState('');
  const [searchedPokemon, setSearchedPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);

  const nextPage = () => {
    setListLimit([(listLimit[0] + pokemonLimit), (listLimit[1] + pokemonLimit)]);
    setPokemonToShow(pokemonList.slice((listLimit[0] + pokemonLimit), (listLimit[1] + pokemonLimit)))
  }

  const previousPage = () => {
    if(listLimit[0] != 0) {
      setListLimit([(listLimit[0] - pokemonLimit), (listLimit[1] - pokemonLimit)]);
      setPokemonToShow(pokemonList.slice((listLimit[0] - pokemonLimit), (listLimit[1] - pokemonLimit)))
    }
  }

  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if(!searchValue.length >= 1) {
      setSearchedPokemon(pokemonToShow);
    } else {
      let searchedPokemonNew = pokemonList.filter(pokemon => {
        const pokemonNameLowerCase = pokemon.name.toLowerCase();
        const searchedPokemonLowerCase = searchValue.toLowerCase();
        return pokemonNameLowerCase.includes(searchedPokemonLowerCase);
      });
      setSearchedPokemon(searchedPokemonNew);
    };
  }, [searchValue, pokemonList, pokemonToShow]);

  const states = {
    listLimit,
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