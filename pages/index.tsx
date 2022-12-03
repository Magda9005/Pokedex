import { cachedJsonFetch } from "../api/fetch";
import { getAllPokemons, getPokemonsWithTypes } from "../api/fetch";
import { GetServerSideProps } from "next";
import { publicApi } from "../envVariables";
import PokemonPage from "../components/PokemonPage";
import Head from "next/head";

interface PokemonsPageProps {
  pokemons: { name: string; url: string }[];
  pokemonsWithTypes: any[];
  allNames: { name: string; url: string }[];
}

const PokemonsFirstPage: React.FC<PokemonsPageProps> = ({
  pokemons,
  pokemonsWithTypes,
  allNames,
}) => (
  <>
    <Head>
      <title>Pokedex </title>
    </Head>
    <PokemonPage
      pageNr={1}
      pokemons={pokemons}
      pokemonsWithTypes={pokemonsWithTypes}
      allNames={allNames}
    />
  </>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = publicApi;
  const data = await cachedJsonFetch(`${apiUrl}/pokemon?offset=0&limit=24`);
  const pokemons = data.results;
  const allNames = await getAllPokemons();
  const pokemonsWithTypes = await getPokemonsWithTypes(pokemons, apiUrl);

  return {
    props: {
      pokemons,
      pokemonsWithTypes,
      allNames,
    },
  };
};

export default PokemonsFirstPage;
