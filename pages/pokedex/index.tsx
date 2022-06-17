import Link from "next/link";
import {
  getPokemonId,
  fuzzySearchResults,
  createAnArrayOfAllNamesAndIds,
} from "../../.vscode/functions/helper_functions";
import { getAllPokemons } from "../../.vscode/functions/storage";
import React, { useState, useEffect } from "react";
import { useCookie } from "react-use";
import SearchForPokemon from "../../components/SearchComponent";
import MiniCard from "../../components/MiniCard";
import { GetServerSideProps } from "next";
import Image from "next/image";
import {
  publicApi,
  pokemonImgApi,
} from "../../.vscode/functions/env_variables";
import styles from "../../components/modules/pokedexMainPage.module.scss";

interface PokemonsListFirstPage {
  pokemons: { name: string; url: string }[];
  pokemonsTypes: any[];
  allNames: { name: string; url: string }[];
}

const PokemonsListFirstPage: React.FC<PokemonsListFirstPage> = ({
  pokemons,
  pokemonsTypes,
  allNames,
}) => {
  const [page, updateCookie] = useCookie("pageNumber");
  const [text, setText] = useState("");
  const [route, setRoute] = useState<string | number>();
  const [displayError, setDisplayError] = useState(false);
  const pokemonImage: string = pokemonImgApi;
  const pokemonsNamesAndTypes = {};
  for (let i = 0; i < pokemonsTypes.length; i++) {
    pokemonsNamesAndTypes[pokemonsTypes[i].name] =
      pokemonsTypes[i].types[0].type.name;
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
    <div className={styles["pokemon-list-container"]}>
      <div className={styles["pokedex-title"]}>
        <Image
          src="/pokeball-main-page.svg"
          alt="pokeball-logo"
          priority="true"
          layout="responsive"
          width="328"
          height="32"
        />
      </div>
      <SearchForPokemon
        result={fuzzySearchResults(allNames, text)}
        route={route}
        onSubmit={handleSubmit}
        onChangeAutocomplete={handlePokemonSearch}
        onChangeTextField={handleOnChangeTextField}
        action={!displayError && `/pokedex/pokemon/${route}`.toLowerCase()}
      />
      <div className={styles["pokemon-cards-container"]}>
        {displayError && (
          <div className={styles["error-message"]}>
            {" "}
            Sorry, no Pokémon matched your search!
          </div>
        )}
        {pokemonsList}
      </div>
      <div className={styles["next-btn-area"]}>
        <Link href={`/pokedex/${page + 1}`} role="link">
          <button role="button" className={styles["btn-next-prev"]}>
            {" "}
            <img
              src="/chevron-right-black.svg"
              className={styles["next-icon"]}
            />{" "}
          </button>
        </Link>
      </div>
      <p className="copyright"> Design: Figma by Ricardo Schiniegoski</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = publicApi;
  const data = await fetch(`${apiUrl}/pokemon?offset=0&limit=24`).then(
    (response) => response.json()
  );
  const pokemons = data.results;
  const allNames = await getAllPokemons();
  const pokemonsTypes = [];
  for (const { name } of pokemons) {
    const data = await fetch(`${apiUrl}/pokemon/${name}`).then((response) =>
      response.json()
    );
    pokemonsTypes.push(data);
  }

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      pokemons,
      pokemonsTypes,
      allNames,
    },
  };
};

export default PokemonsListFirstPage;
