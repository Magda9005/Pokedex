import {
  getPokemonId,
  getPokemonDescription,
  getAllPokemonsNamesAndIds,
  jsonFetch,
} from "../../.vscode/functions/helper_functions";
import Link from "next/link";
import { useCookie } from "react-use";
import Image from "next/image";
import { GetServerSideProps } from "next";
import StatsSlider from "../../components/StatSlider";
import {
  publicApi,
  pokemonImgApi,
} from "../../.vscode/functions/env_variables";
import classNames from "classnames/bind";
import styles from "../../components/modules/pokemonCard.module.scss";
import { PokemonProps } from "../../.vscode/functions/interfaces";

let className = classNames.bind(styles);

const Pokemon: React.FC<PokemonProps> = ({
  pokemonsCharacteristic,
  pokemonsDescriptionText,
}) => {
  const [value] = useCookie("pageNumber");
  const pokemonId = getPokemonId(pokemonsCharacteristic.forms[0].url);
  let page = value == "1" ? `/` : `/${value}`;

  const stats = {
    hp: pokemonsCharacteristic.stats[0].base_stat,
    atk: pokemonsCharacteristic.stats[1].base_stat,
    def: pokemonsCharacteristic.stats[2].base_stat,
    satk: pokemonsCharacteristic.stats[3].base_stat,
    sdef: pokemonsCharacteristic.stats[4].base_stat,
    spd: pokemonsCharacteristic.stats[5].base_stat,
  };

  let statsArray = Object.entries(stats);

  const statsHeaders = statsArray.map((stat) => (
    <span key={stat[0]}>{stat[0].toUpperCase()}</span>
  ));

  const statsResultsNumbers = statsArray.map((stat) => (
    <span key={stat[0]}>{stat[1]}</span>
  ));

  const statsSliders = statsArray.map((stat) => (
    <StatsSlider
      statName={stat[0]}
      statValue={stat[1]}
      pokemonType={pokemonsCharacteristic.types[0].type.name}
    />
  ));

  const pokemonImage: string = pokemonImgApi;

  const pokemonName =
    pokemonsCharacteristic.name[0].toUpperCase() +
    pokemonsCharacteristic.name.substring(1);
  const weight = pokemonsCharacteristic.weight / 10;
  const height = pokemonsCharacteristic.height / 10;
  const quantityOfAbilitiesToBeDisplayed: number = 2;
  const abilities = pokemonsCharacteristic.abilities.map((ability, index) => {
    if (index < quantityOfAbilitiesToBeDisplayed) {
      return (
        <span key={ability.name} className={styles["about-parameter"]}>
          {ability.ability.name}
        </span>
      );
    }
  });

  const categories = pokemonsCharacteristic.types.map((type) => {
    let category = className(`${styles.type}`, ` bgc-${type.type.name}`);
    return (
      <div className={category} key={type.type.name}>
        {type.type.name}
      </div>
    );
  });

  const chevronRight = className(
    styles["chevron-right"],
    styles["chevron-card"]
  );
  const chevronLeft = className(styles["chevron-left"], styles["chevron-card"]);
  const aboutHeader = className(
    pokemonsCharacteristic.types[0].type.name,
    styles["about-main-header"]
  );
  const statsHeader = className(
    pokemonsCharacteristic.types[0].type.name,
    styles["stats-header"]
  );
  const statName = className(
    pokemonsCharacteristic.types[0].type.name,
    styles["base-stat-name"]
  );

  return (
    <div
      className={
        `${styles.card}` + ` bgc-${pokemonsCharacteristic.types[0].type.name}`
      }
    >
      <div className={styles["pokemon-name"]}>
        <div className={styles.name}>
          <Link href={page}>
            <a role="link" className={styles["arrow-left"]}></a>
          </Link>{" "}
          {pokemonName}{" "}
        </div>
        <span># {pokemonId}</span>
      </div>
      <div className={styles["pokeball-container"]}>
        <Image
          src="/pokeball.svg"
          alt="pokeball"
          layout="responsive"
          width="208"
          height="208"
        />
      </div>
      <div className={styles["image-container"]}>
        <Image
          src={`${pokemonImage}` + pokemonId + `.svg`}
          layout="responsive"
          width="200"
          height="200"
          alt={pokemonsCharacteristic.name}
        />
      </div>
      <div
        className={
          pokemonId > 1
            ? styles["chevrons-container"]
            : styles["chevrons-container-firstPokemon"]
        }
      >
        {pokemonId > 1 && (
          <Link href={`${pokemonId - 1}`}>
            <a role="link" className={chevronLeft}></a>
          </Link>
        )}
        {pokemonId < 648 && (
          <Link href={`${pokemonId + 1}`}>
            <a role="link" className={chevronRight}></a>
          </Link>
        )}
      </div>
      <div className={styles["parameters-container"]}>
        <div className={styles["type-container"]}>{categories}</div>
        <div className={styles["about-section"]}>
          <p className={aboutHeader}>About</p>
          <div className={styles["about-parameter"]}>
            <div className={styles["weight-container"]}>
              <div className={styles.weight}>
                <span className={styles["about-header"]}>Weight</span>
                <span className={styles["about-parameter"]}>
                  <img
                    src="/scale.svg"
                    alt="scale icon"
                    className={styles["scale-icon"]}
                  />{" "}
                  {weight} kg
                </span>
              </div>
            </div>
            <div className={styles["height-container"]}>
              <div className={styles.height}>
                <span className={styles["about-header"]}>Height</span>
                <span className={styles["about-parameter"]}>
                  <img
                    src="/ruler.svg"
                    alt="ruler icon"
                    className={styles["ruler-icon"]}
                  />
                  {height} m
                </span>
              </div>
            </div>
            <div className={styles["moves-container"]}>
              <div className={styles.moves}>
                <span className={styles["about-header"]}>Moves</span>
                {abilities}
              </div>
            </div>
          </div>
        </div>
        <div className={styles["pokemon-description"]}>
          {
            pokemonsDescriptionText.flavor_text_entries[
              getPokemonDescription(pokemonId)
            ].flavor_text
          }
        </div>
        <div className={styles["base-stats-container"]}>
          <div className={styles["base-stats-header"]}>
            <p className={statsHeader}>Base stats </p>
          </div>
          <div className={styles["base-stats-parameters"]}>
            <div className={statName}>{statsHeaders}</div>
          </div>
          <div className={styles["base-stats-parameters"]}>
            <div className={styles["base-stat-score"]}>
              {statsResultsNumbers}
            </div>
          </div>
          <div className={styles["base-stats-parameters"]}>
            <div className={styles["base-stat-visual-representation"]}>
              {statsSliders}
            </div>
          </div>
        </div>
        <p className="copyright"> Design: Figma by Ricardo Schiniegoski</p>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params;
  const apiUrl = publicApi;

  const allPokemonsNamesAndIds = await getAllPokemonsNamesAndIds();
  if (!allPokemonsNamesAndIds.includes(name)) {
    return {
      notFound: true,
    };
  }

  const pokemonsCharacteristic = await jsonFetch(`${apiUrl}/pokemon/${name}`);
  const pageNotFound = pokemonsCharacteristic.status == 404;
  const pokemonsDescriptionText = await jsonFetch(
    `${apiUrl}/pokemon-species/${name}`
  );

  if (pageNotFound) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pokemonsCharacteristic,
      pokemonsDescriptionText,
    },
  };
};
export default Pokemon;
