import styles from "../components/modules/pokedexMainPage.module.scss";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import Pagination from "./Pagination";
import Copyright from "./Copyright";
import { lastAccessiblePage } from "../constants";
import { getPokemonId } from "../logic/data";
import MiniCard from "./MiniCard";
import PokemonSearchBar from "./SearchComponent";

interface PokemonsListProps {
  result: { item: { name: string; url: string } }[];
  route: string | number;
  onSubmit: (e: React.SyntheticEvent) => void;
  onChangeAutocomplete: Dispatch<SetStateAction<string | number>>;
  onChangeTextField: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  action: string;
  displayError: boolean;
  listElements: JSX.Element[];
  url: string;
  pageNumber: number;
  nextPage: string;
  pokemons: { name: string; url: string }[];
  pokemonsNamesAndTypes: { string: string };
  pokemonImage: string;
}

const PokemonsList: React.FC<PokemonsListProps> = ({
  result,
  route,
  onSubmit,
  onChangeAutocomplete,
  onChangeTextField,
  action,
  displayError,
  url,
  pageNumber,
  nextPage,
  pokemons,
  pokemonsNamesAndTypes,
  pokemonImage,
}) => {
  const hasPrev = pageNumber > 1;
  const hasNext = pageNumber <= lastAccessiblePage;

  return (
    <div className={styles["pokemon-list-container"]}>
      <div className={styles["pokedex-title"]}>
        <Image
          src="/pokeball-main-page.svg"
          alt="pokeball-logo"
          priority={true}
          layout="responsive"
          width="328"
          height="32"
        />
      </div>
      <div className={styles["search-input"]}>
        <PokemonSearchBar
          result={result}
          route={route}
          onSubmit={onSubmit}
          onChangeAutocomplete={onChangeAutocomplete}
          onChangeTextField={onChangeTextField}
          action={action}
        />
      </div>
      <div className={styles["pokemon-cards-container"]}>
        {displayError && (
          <div className={styles["error-message"]}>
            {" "}
            Sorry, no Pokémon matched your search!
          </div>
        )}

        {pokemons.map((pokemon) => {
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
        })}
      </div>
      <Pagination
        hasPrev={hasPrev}
        hasNext={hasNext}
        url={url}
        nextPage={nextPage}
      />
      <Copyright />
    </div>
  );
};

export default PokemonsList;
