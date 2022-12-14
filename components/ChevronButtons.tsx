import Link from "next/link";
import styles from "../components/modules/chevronsButtons.module.scss";
import classNames from "classnames/bind";

let className = classNames.bind(styles);
const rightStyle = className(styles.chevronRight, styles.chevronCard);
const leftStyle = className(styles.chevronLeft, styles.chevronCard);

interface ChevronButtonsProps {
  pokemonId: number;
  minPokemonId: number;
  maxPokemonId: number;
}

const ChevronButtons: React.FC<ChevronButtonsProps> = ({
  pokemonId,
  minPokemonId,
  maxPokemonId,
}) => {
  return (
    <div
      className={
        pokemonId > minPokemonId
          ? styles.chevronsContainer
          : styles.chevronsContainerFirstPokemon
      }
    >
      {pokemonId > minPokemonId && (
        <Link href={`${pokemonId - 1}`}>
          <a role="link" className={leftStyle}></a>
        </Link>
      )}
      {pokemonId < maxPokemonId && (
        <Link href={`${pokemonId + 1}`}>
          <a role="link" className={rightStyle}></a>
        </Link>
      )}
    </div>
  );
};

export default ChevronButtons;
