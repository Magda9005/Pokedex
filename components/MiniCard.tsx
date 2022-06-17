import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./modules/MiniCard.module.css";

let className = classNames.bind(styles);

interface MiniCard {
  pokemon: {
    name: string;
  };
  pokemonId: number;
  pokemonImage: string;
  pokemonName: string;
  pokemonsNamesAndTypes: any;
}
const MiniCard: React.FC<MiniCard> = ({
  pokemon,
  pokemonId,
  pokemonImage,
  pokemonName,
  pokemonsNamesAndTypes,
}) => {
  const miniCard = className(
    styles["mini-card-background"],
    `bgc-${pokemonsNamesAndTypes[pokemon.name]}`
  );
  const id = className(
    styles["pokemon-id"],
    pokemonsNamesAndTypes[pokemon.name]
  );

  return (
    <>
      <Link href={`/pokedex/pokemon/${pokemon.name}`}>
        <div key={pokemon.name} className={miniCard}>
          <div className={styles["mini-card"]}>
            <span className={id}>#{pokemonId}</span>
            <div className={styles["pokemon-mini-image-container"]}>
              <Image
                src={pokemonImage + pokemonId + `.svg`}
                priority="true"
                layout="responsive"
                width="50"
                height="50"
              />
            </div>
          </div>
          <div className={styles["mini-card-pokemon-name"]}>{pokemonName}</div>
        </div>
      </Link>
    </>
  );
};

export default MiniCard;
