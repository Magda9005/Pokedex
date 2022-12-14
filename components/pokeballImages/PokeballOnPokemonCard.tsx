import Image from "next/image";
import styles from "../modules/pokemonCard.module.scss";

const Pokeball = () => (
  <div className={styles.pokeballContainer}>
    <Image
      src="/pokeball.svg"
      alt="pokeball"
      layout="responsive"
      width="208"
      height="208"
    />
  </div>
);

export default Pokeball;
