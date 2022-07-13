import styles from "../components/modules/pokedexMainPage.module.scss";
import Image from "next/image";
import Link from "next/link";
import PokemonSearch from "./SearchComponent";
import { PokemonsListProps } from "../.vscode/functions/interfaces";

const PokemonsList: React.FC<PokemonsListProps> = ({
  result,
  route,
  onSubmit,
  onChangeAutocomplete,
  onChangeTextField,
  action,
  displayError,
  listElements,
  url,
  pageNumber,
  nextPage,
}) => {
  const lastAccessiblePage: number = 27;

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
      <PokemonSearch
        result={result}
        route={route}
        onSubmit={onSubmit}
        onChangeAutocomplete={onChangeAutocomplete}
        onChangeTextField={onChangeTextField}
        action={action}
      />
      <div className={styles["pokemon-cards-container"]}>
        {displayError && (
          <div className={styles["error-message"]}>
            {" "}
            Sorry, no Pokémon matched your search!
          </div>
        )}
        {listElements}
      </div>
      <div
        className={
          pageNumber > 1
            ? styles["next-previous-page-area"]
            : styles["next-button-area"]
        }
      >
        {pageNumber > 1 && (
          <Link href={url}>
            <a role="link" className={styles["next-prev-link"]}>
              {" "}
              <img
                src="/chevron-left-black.svg"
                className={styles["previous-icon"]}
              />{" "}
            </a>
          </Link>
        )}
        {pageNumber <= lastAccessiblePage && (
          <Link href={nextPage}>
            <a role="link" className={styles["next-prev-link"]}>
              {" "}
              <img
                src="/chevron-right-black.svg"
                className={styles["next-icon"]}
              />{" "}
            </a>
          </Link>
        )}
      </div>
      <p className="copyright"> Design: Figma by Ricardo Schiniegoski</p>
    </div>
  );
};

export default PokemonsList;
