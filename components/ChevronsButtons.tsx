import Link from "next/link";
import styles from "../components/modules/chevronsButtons.module.scss";
import classNames from "classnames/bind";

let className = classNames.bind(styles);

interface ChevronsButtonsProps {
  pokemonId: number;
  minPokemonId: number;
  maxPokemonId: number;
}

const ChevronsButtons: React.FC<ChevronsButtonsProps> = ({
  pokemonId,
  minPokemonId,
  maxPokemonId,
}) => {
  const chevronRight = className(styles.chevronRight, styles.chevronCard);
  const chevronLeft = className(styles.chevronLeft, styles.chevronCard);

  return (
    <>
      <div
        className={
          pokemonId > minPokemonId
            ? styles.chevronsContainer
            : styles.chevronsContainerFirstPokemon
        }
      >
        {pokemonId > minPokemonId && (
          <Link href={`${pokemonId - 1}`}>
            <a role="link" className={chevronLeft}></a>
          </Link>
        )}
        {pokemonId < maxPokemonId && (
          <Link href={`${pokemonId + 1}`}>
            <a role="link" className={chevronRight}></a>
          </Link>
        )}
      </div>
    </>
  );
};

export default ChevronsButtons;
