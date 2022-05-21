import Link from "next/link";
import Image from "next/image";

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
}) => (
  <>
    <Link href={`/pokedex/pokemon/${pokemon.name}`}>
      <div
        key={pokemon.name}
        className={
          `mini-card-background` + ` bgc-` + pokemonsNamesAndTypes[pokemon.name]
        }
      >
        <div className="mini-card">
          <span className={`pokemon-id ` + pokemonsNamesAndTypes[pokemon.name]}>
            #{pokemonId}
          </span>
          <div className="pokemon-mini-image-container">
            <Image
              src={pokemonImage + pokemonId + `.svg`}
              priority="true"
              width="50"
              height="50"
            />
          </div>
        </div>
        <div className="mini-card-pokemon-name">{pokemonName}</div>
      </div>
    </Link>
  </>
);

export default MiniCard;
