import { getPokemonId, getProperDescriptionOfPokemon } from "../../logic/data";
import { cachedJsonFetch, RequestFailError } from "../../api/fetch";
import Link from "next/link";
import { useCookie } from "react-use";
import { GetServerSideProps } from "next";
import StatsSlider from "../../components/StatSlider";
import PokemonParameters from "../../components/PokemonParameters";
import { publicApi, pokemonImgApi } from "../../envVariables";
import classNames from "classnames/bind";
import styles from "../../components/modules/pokemonCard.module.scss";
import Head from "next/head";
import Pokeball from "../../components/pokeballImages/PokeballOnPokemonCard";
import PokemonImage from "../../components/PokemonImage";
import ChevronButtons from "../../components/ChevronButtons";
import { minPokemonId, maxPokemonId } from "../../utils/constants";
import Copyright from "../../components/Copyright";

let className = classNames.bind(styles);

interface PokemonProps {
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
      <div key={stat[0]} className={styles.statHeader}>{stat[0].toUpperCase()}
      </div>
    
  ));


  const statsResultsNumbers = statsArray.map((stat) => (
      <div key={stat[0]} className={styles.statResult}>{stat[1]}
      </div>
   
  ));



  const statsSliders = statsArray.map((stat) => (
      <StatsSlider
      key={stat[0]}
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
        <span key={ability.name} className={styles.aboutParameter}>
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

  const aboutHeader = className(
    pokemonsCharacteristic.types[0].type.name,
    styles.aboutMainHeader
  );
  const statsHeader = className(
    pokemonsCharacteristic.types[0].type.name,
    styles.statsHeader
  );
  const statName = className(
    pokemonsCharacteristic.types[0].type.name,
    styles.baseStatName
  );

  return (
    <>
      <Head>
        <title>Pokedex - {pokemonName} </title>
      </Head>
      <div
        className={
          `${styles.card}` + ` bgc-${pokemonsCharacteristic.types[0].type.name}`
        }
      >
        <div className={styles.pokemonName}>
          <div className={styles.name}>
            <Link href={page}>
              <a role="link" className={styles.arrowLeft}></a>
            </Link>{" "}
            {pokemonName}{" "}
          </div>
          <span># {pokemonId}</span>
        </div>
        <Pokeball />
        <PokemonImage
          src={`${pokemonImage}` + pokemonId + `.svg`}
          alt={pokemonsCharacteristic.name}
          width={200}
          height={200}
        />
        <ChevronButtons
          pokemonId={pokemonId}
          minPokemonId={minPokemonId}
          maxPokemonId={maxPokemonId}
        />
        <PokemonParameters
          categories={categories}
          aboutHeader={aboutHeader}
          weight={weight}
          height={height}
          abilities={abilities}
          statsHeader={statsHeader}
          statsHeaders={statsHeaders}
          statsResultsNumbers={statsResultsNumbers}
          statsSliders={statsSliders}
          statName={statName}
          pokemonsDescriptionText={
            pokemonsDescriptionText.flavor_text_entries[
              getProperDescriptionOfPokemon(pokemonId)
            ].flavor_text
          }
        />
      </div>
      <Copyright />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params;
  const apiUrl = publicApi;

  try {
    const pokemonsCharacteristic = await cachedJsonFetch(
      `${apiUrl}/pokemon/${name}`
    );
    const pokemonsDescriptionText = await cachedJsonFetch(
      `${apiUrl}/pokemon-species/${name}`
    );
    return {
      props: {
        pokemonsCharacteristic,
        pokemonsDescriptionText,
      },
    };
  } catch (err) {
    if (err.status == 404) {
      if (err instanceof RequestFailError) {
        return {
          notFound: true,
        };
      }
    }

    throw err;
  }
};
export default Pokemon;


