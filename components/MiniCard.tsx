import Link from "next/link";
import Image from "next/image";
import classNames from "classnames/bind";
import styles from "./modules/miniCard.module.scss";

let className = classNames.bind(styles);

interface MiniCardProps {
  pokemon: {
    name: string;
  };
  pokemonId: number;
  pokemonImage: string;
  pokemonName: string;
  pokemonsNamesAndTypes: unknown;
}

const MiniCard: React.FC<MiniCardProps> = ({
  pokemon,
  pokemonId,
  pokemonImage,
  pokemonName,
  pokemonsNamesAndTypes,
}) => {
  const miniCardClass = className(
    styles.miniCardBackground,
    `bgc-${pokemonsNamesAndTypes[pokemon.name]}`
  );
  const idClass = className(
    styles.pokemonId,
    pokemonsNamesAndTypes[pokemon.name]
  );

  return (
    <Link href={`/pokemon/${pokemon.name}`}>
      <div key={pokemon.name} className={miniCardClass}>
        <div className={styles.miniCard}>
          <span className={idClass}>#{pokemonId}</span>
          <div className={styles.pokemonMiniImageContainer}>
            <Image
              src={pokemonImage + pokemonId + `.svg`}
              priority={true}
              layout="responsive"
              width="50"
              height="50"
            />
          </div>
        </div>
        <div className={styles.miniCardPokemonName}>{pokemonName}</div>
      </div>
    </Link>
  );
};

export default MiniCard;
