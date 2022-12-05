import styles from "../components/modules/pokedexMainPage.module.scss";
import Pagination from "./Pagination";
import Copyright from "./Copyright";
import { lastAccessiblePage } from "../utils/constants";
import { getPokemonId } from "../logic/data";
import MiniCard from "./MiniCard";
import PokemonSearchBar from "./SearchComponent";
import Pokeball from "../components/PokeballMainPage";
import ErrorMessage from "../components/ErrorMessage";
import { Dispatch, SetStateAction } from "react";

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonsListProps {
  allNames: { name: string; url: string }[];
  displayError: boolean;
  handleDisplayError: Dispatch<SetStateAction<boolean>>;
  prevPageUrl: string;
  pageNumber: number;
  nextPageUrl: string;
  pokemons: { name: string; url: string }[];
  pokemonsNamesAndTypes: { string: string };
  pokemonImageBaseUrl: string;
}

const PokemonsList: React.FC<PokemonsListProps> = ({
  allNames,
  displayError,
  handleDisplayError,
  prevPageUrl,
  pageNumber,
  nextPageUrl,
  pokemons,
  pokemonsNamesAndTypes,
  pokemonImageBaseUrl,
}) => {
  const hasPrev = pageNumber > 1;
  const hasNext = pageNumber <= lastAccessiblePage;
  return (
    <div className={styles.pokemonListContainer}>
      <div className={styles.pokedexTitle}>
        <Pokeball />
      </div>
      <div className={styles.searchInput}>
        <PokemonSearchBar
          allNames={allNames}
          displayError={displayError}
          handleDisplayError={handleDisplayError}
        />
      </div>
      <div className={styles.pokemonCardsContainer}>
        {displayError && <ErrorMessage />}

        {pokemons.map((pokemon) => {
          const pokemonName: string =
            pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
          const pokemonId: number = getPokemonId(pokemon.url);

          return (
            <MiniCard
              pokemon={pokemon}
              pokemonId={pokemonId}
              pokemonImage={pokemonImageBaseUrl}
              pokemonName={pokemonName}
              pokemonsNamesAndTypes={pokemonsNamesAndTypes}
            />
          );
        })}
      </div>
      <Pagination
        hasPrev={hasPrev}
        hasNext={hasNext}
        prevUrl={prevPageUrl}
        nextUrl={nextPageUrl}
      />
      <Copyright />
    </div>
  );
};

export default PokemonsList;
