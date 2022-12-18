import PokemonsList from "./PokemonsList";
import React, { useState, useEffect } from "react";
import { useCookie } from "react-use";
import { pokemonImgApi } from "../envVariables";
import { getPreviousPage } from "../logic/urls";

interface PokemonPageProps {
  pageNr: number;
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
  const [displayError, setDisplayError] = useState(false);
  const pokemonImage: string = pokemonImgApi;
  const pokemonsNamesAndTypes = {};
  for (let pokemon of pokemonsWithTypes) {
    pokemonsNamesAndTypes[pokemon.name] = pokemon.type;

  }
  const pagenumber = pageNr;
  useEffect(() => {
    updateCookie(pagenumber.toString());
  }, []);

  return (
    <PokemonsList
      allNames={allNames}
      displayError={displayError}
      handleDisplayError={setDisplayError}
      prevPageUrl={pagenumber <= 1 ? "/" : getPreviousPage(pagenumber)}
      pageNumber={pagenumber}
      nextPageUrl={`/${parseFloat(pagenumber.toString()) + 1}`}
      pokemons={pokemons}
      pokemonsNamesAndTypes={pokemonsNamesAndTypes}
      pokemonImageBaseUrl={pokemonImage}
    />
  );
};

export default PokemonPage;
