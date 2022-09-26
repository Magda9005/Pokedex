import PokemonsList from "./PokemonsList";
import { createAnArrayOfAllNamesAndIds } from "../logic/data";
import { fuzzySearchResults } from "../logic/search";
import React, { useState, useEffect } from "react";
import { useCookie } from "react-use";
import { pokemonImgApi } from "../.vscode/functions/env_variables";
import { getPageUrl, getPreviousPage } from "../logic/urls";

interface PokemonPageProps {
  pageNr: number | string;
  pokemons: { name: string; url: string }[];
  pokemonsWithTypes: any[];
  allNames: { name: string; url: string }[];
}

const PokemonPage: React.FC<PokemonPageProps> = ({
  pageNr,
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

  const pagenumber = pageNr;

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

  return (
    <PokemonsList
      result={fuzzySearchResults(allNames, text)}
      route={route}
      onSubmit={handleSubmit}
      onChangeAutocomplete={handlePokemonSearch}
      onChangeTextField={handleOnChangeTextField}
      action={!displayError && `/pokemon/${route}`.toLowerCase()}
      displayError={displayError}
      url={pagenumber <= 1 ? "/" : getPreviousPage(pagenumber)}
      pageNumber={pagenumber}
      nextPage={`/${parseFloat(pagenumber) + 1}`}
      pokemons={pokemons}
      pokemonsNamesAndTypes={pokemonsNamesAndTypes}
      pokemonImage={pokemonImage}
    />
  );
};

export default PokemonPage;
