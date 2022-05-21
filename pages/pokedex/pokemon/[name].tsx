import {
  getPokemonId,
  getPokemonDescription,
  getAllPokemonsNamesAndIds,
} from "./helper_functions";
import Link from "next/link";
import { useCookie } from "react-use";
import Image from "next/image";
import { GetServerSideProps } from "next";
import StatsSlider from "./StatSlider";
import { publicApi, pokemonImgApi } from "./env_variables";

interface Pokemon {
  pokemonsCharacteristic: {
    forms: {
      url: string;
    };
    types: {
      type: {
        name: string;
      };
    }[];
    stats: {
      base_stat: number;
    };
    name: string;
    weight: number;
    height: number;
    abilities: {
      name: string;
      ability: {
        name: string;
      };
    }[];
  };
  pokemonsDescriptionText: {
    flavor_text_entries: {
      flavor_text: string;
    };
  };
}

const Pokemon: React.FC<Pokemon> = ({
  pokemonsCharacteristic,
  pokemonsDescriptionText,
}) => {
  const [value] = useCookie("pageNumber");
  const pokemonId = getPokemonId(pokemonsCharacteristic.forms[0].url);
  let page = value == "1" ? `/pokedex` : `/pokedex/${value}`;

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
        <span key={ability.name} className="about-parameter">
          {ability.ability.name}
        </span>
      );
    }
  });

  const categories = pokemonsCharacteristic.types.map((type) => (
    <div
      className={`type` + ` ` + `bgc-` + type.type.name}
      key={type.type.name}
    >
      {type.type.name}
    </div>
  ));

  return (
    <div
      className={
        `card` + ` ` + `bgc-` + pokemonsCharacteristic.types[0].type.name
      }
    >
      <div className="pokemon-name">
        <div className="name">
          <Link href={page} role="link">
            <button role="button" className="arrow-left"></button>
          </Link>{" "}
          {pokemonName}{" "}
        </div>
        <span># {pokemonId}</span>
      </div>
      <div className="pokeball-container">
        <Image src="/pokeball.svg" alt="pokeball" width="208" height="208" />
      </div>
      <div className="image-container">
        <Image
          src={`${pokemonImage}` + pokemonId + `.svg`}
          width="200"
          height="200"
          alt={pokemonsCharacteristic.name}
        />
      </div>
      <div className="chevrons-container">
        <Link href={`${pokemonId - 1}`} role="link">
          <button
            role="button"
            className="chevron-left chevron-card"
            disabled={pokemonId < 2}
          ></button>
        </Link>

        <Link href={`${pokemonId + 1}`} role="link">
          <button
            role="button"
            className="chevron-right chevron-card"
            disabled={pokemonId > 647}
          ></button>
        </Link>
      </div>
      <div className="parameters-container">
        <div className="type-container">{categories}</div>
        <div className="about-section">
          <p
            className={
              pokemonsCharacteristic.types[0].type.name + ` about-main-header`
            }
          >
            About
          </p>
          <div className="about-parameters">
            <div className="weight-container">
              <div className="weight">
                <span className="about-header">Weight</span>
                <span className="about-parameter">
                  <img
                    src="/scale.svg"
                    alt="scale icon"
                    className="scale-icon"
                  />{" "}
                  {weight} kg
                </span>
              </div>
            </div>
            <div className="height-container">
              <div className="height">
                <span className="about-header">Height</span>
                <span className="about-parameter">
                  <img
                    src="/ruler.svg"
                    alt="ruler icon"
                    className="ruler-icon"
                  />
                  {height} m
                </span>
              </div>
            </div>
            <div className="moves-container">
              <div className="moves">
                <span className="about-header">Moves</span>
                {abilities}
              </div>
            </div>
          </div>
        </div>
        <div className="pokemon-description">
          {
            pokemonsDescriptionText.flavor_text_entries[
              getPokemonDescription(pokemonId)
            ].flavor_text
          }
        </div>
        <div className="base-stats-container">
          <div className="base-stats-header">
            <p
              className={
                pokemonsCharacteristic.types[0].type.name + ` stats-header`
              }
            >
              Base stats{" "}
            </p>
          </div>
          <div className="base-stats-parameters">
            <div
              className={
                pokemonsCharacteristic.types[0].type.name + ` base-stat-name`
              }
            >
              {statsHeaders}
            </div>
          </div>
          <div className="base-stats-parameters">
            <div className="base-stat-score">{statsResultsNumbers}</div>
          </div>
          <div className="base-stats-parameters">
            <div className="base-stat-visual-representation">
              {statsSliders}
            </div>
          </div>
        </div>
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

  const pokemonsCharacteristic = await fetch(`${apiUrl}/pokemon/${name}`).then(
    (response) => response.json()
  );
  const pageNotFound = pokemonsCharacteristic.status == 404;
  const pokemonsDescriptionText = await fetch(
    `${apiUrl}/pokemon-species/${name}`
  ).then((response) => response.json());

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
