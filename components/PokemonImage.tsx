import Image from "next/image";
import styles from "../components/modules/pokemonCard.module.scss";

interface PokemonImageProps {
  src: string;
  alt: string;
  height: number;
  width: number;
}

const PokemonImage: React.FC<PokemonImageProps> = ({
  src,
  alt,
  height,
  width,
}) => {
  return (
    <>
      <div className={styles.imageContainer}>
        <Image
          src={src}
          layout="responsive"
          width={width}
          height={height}
          alt={alt}
        />
      </div>
    </>
  );
};

export default PokemonImage;
