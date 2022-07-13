import {
  getPokemonId,
  fuzzySearchResults,
  createAnArrayOfAllNamesAndIds,
  jsonFetch,
} from "../.vscode/functions/helper_functions";
import { getAllPokemons } from "../.vscode/functions/storage";
import React, { useState, useEffect } from "react";
import { useCookie } from "react-use";
import MiniCard from "../components/MiniCard";
import { GetServerSideProps } from "next";
import { publicApi, pokemonImgApi } from "../.vscode/functions/env_variables";
import PokemonsList from "../components/PokemonsPage";
import { PokemonsPageProps } from "../.vscode/functions/interfaces";

const PokemonsFirstPage: React.FC<PokemonsPageProps> = ({
  pokemons,
  pokemonsWithTypes,
  allNames,
}) => {
  const [page, updateCookie] = useCookie("pageNumber");
  const [text, setText] = useState("");
  const [route, setRoute] = useState<string | number>();
  const [displayError, setDisplayError] = useState(false);
  const pokemonImage: string = pokemonImgApi;
  const pokemonsNamesAndTypes = {};
  for (let pokemon of pokemonsWithTypes) {
    pokemonsNamesAndTypes[pokemon.name] = pokemon.types[0].type.name;
  }

  const pagenumber = 1;

  useEffect(() => {
    updateCookie(pagenumber);
  }, []);

  const handlePokemonSearch = setRoute;

  const handleOnChangeTextField = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.target.value == "") {
      setDisplayError(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    const arrayOfAllNamesAndIds = createAnArrayOfAllNamesAndIds(allNames);
    if (route == null || !arrayOfAllNamesAndIds.includes(route.toLowerCase())) {
      e.preventDefault();
      return setDisplayError(true);
    }

    setDisplayError(false);
  };

  const pokemonsList = pokemons.map((pokemon) => {
    const pokemonName: string =
      pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
    const pokemonId: number = getPokemonId(pokemon.url);
    return (
      <MiniCard
        pokemon={pokemon}
        pokemonId={pokemonId}
        pokemonImage={pokemonImage}
        pokemonName={pokemonName}
        pokemonsNamesAndTypes={pokemonsNamesAndTypes}
      />
    );
  });
  return (
    <PokemonsList
      result={fuzzySearchResults(allNames, text)}
      route={route}
      onSubmit={handleSubmit}
      onChangeAutocomplete={handlePokemonSearch}
      onChangeTextField={handleOnChangeTextField}
      action={!displayError && `/pokemon/${route}`.toLowerCase()}
      displayError={displayError}
      listElements={pokemonsList}
      url={"/"}
      pageNumber={pagenumber}
      nextPage={`/${page + 1}`}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = publicApi;
  const data = await jsonFetch(`${apiUrl}/pokemon?offset=0&limit=24`);
  const pokemons = data.results;
  const allNames = await getAllPokemons();
  const pokemonsWithTypes = [];
  for (const { name } of pokemons) {
    const data = await jsonFetch(`${apiUrl}/pokemon/${name}`);
    pokemonsWithTypes.push(data);
  }

  return {
    props: {
      pokemons,
      pokemonsWithTypes,
      allNames,
    },
  };
};

export default PokemonsFirstPage;
