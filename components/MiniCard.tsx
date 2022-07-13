import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./modules/MiniCard.module.css";
import { MiniCardProps } from "../.vscode/functions/interfaces";

let className = classNames.bind(styles);

const MiniCard: React.FC<MiniCardProps> = ({
  pokemon,
  pokemonId,
  pokemonImage,
  pokemonName,
  pokemonsNamesAndTypes,
}) => {
  const miniCardClass = className(
    styles["mini-card-background"],
    `bgc-${pokemonsNamesAndTypes[pokemon.name]}`
  );
  const idClass = className(
    styles["pokemon-id"],
    pokemonsNamesAndTypes[pokemon.name]
  );

  return (
    <>
      <Link href={`/pokemon/${pokemon.name}`}>
        <div key={pokemon.name} className={miniCardClass}>
          <div className={styles["mini-card"]}>
            <span className={idClass}>#{pokemonId}</span>
            <div className={styles["pokemon-mini-image-container"]}>
              <Image
                src={pokemonImage + pokemonId + `.svg`}
                priority={true}
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
