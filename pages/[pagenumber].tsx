import { useRouter } from "next/router";
import {
  fuzzySearchResults,
  getPageUrl,
  getPokemonId,
  getPreviousPage,
  createAnArrayOfAllNamesAndIds,
  jsonFetch,
} from "../.vscode/functions/helper_functions";
import React, { useState, useEffect } from "react";
import { useCookie } from "react-use";
import { getAllPokemons } from "../.vscode/functions/storage";
import MiniCard from "../components/MiniCard";
import { GetServerSideProps } from "next";
import { publicApi, pokemonImgApi } from "../.vscode/functions/env_variables";
import PokemonsList from "../components/PokemonsPage";
import { PokemonsPageProps } from "../.vscode/functions/interfaces";

const PokemonsPage: React.FC<PokemonsPageProps> = ({
  pokemons,
  pokemonsWithTypes,
  allNames,
}) => {
  const [value, updateCookie] = useCookie("pageNumber");
  const [text, setText] = useState("");
  const router = useRouter();
  const [route, setRoute] = useState<string | number>();
  const [displayError, setDisplayError] = useState(false);
  const pokemonImage: string = pokemonImgApi;
  let pagenumber: any = router.query.pagenumber;
  pagenumber++;
  const pokemonsNamesAndTypes = {};
  for (let pokemon of pokemonsWithTypes) {
    pokemonsNamesAndTypes[pokemon.name] = pokemon.types[0].type.name;
  }

  useEffect(() => {
    updateCookie(pagenumber - 1);
  }, [pagenumber]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    const arrayOfAllNamesAndIds = createAnArrayOfAllNamesAndIds(allNames);

    if (route == null || !arrayOfAllNamesAndIds.includes(route.toLowerCase())) {
      e.preventDefault();
      return setDisplayError(true);
    }

    setDisplayError(false);
  };

  const handlePokemonSearch = setRoute;

  function handleOnChangeTextField(
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    if (e.target.value == "") {
      setDisplayError(false);
    }
    setText(e.target.value);
  }
  const listElements = pokemons.map((pokemon) => {
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
      listElements={listElements}
      url={getPreviousPage(pagenumber)}
      pageNumber={pagenumber}
      nextPage={`/${pagenumber}`}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pagenumber: any = context.params.pagenumber;
  const apiUrl = publicApi;
  const maxPageNumber = 27;

  if (pagenumber > maxPageNumber) {
    return {
      notFound: true,
    };
  }
  let URL = getPageUrl(pagenumber);
  const data = await jsonFetch(URL);
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

export default PokemonsPage;
