import { useRouter } from "next/router";
import { getPageUrl } from "../logic/urls";
import { getPokemonsWithTypes, cachedJsonFetch } from "../api/fetch";
import { getAllPokemons } from "../api/fetch";
import { GetServerSideProps } from "next";
import { publicApi } from "../envVariables";
import { lastAccessiblePage } from "../utils/constants";
import PokemonPage from "../components/PokemonPage";
import Head from "next/head";

interface PokemonsPageProps {
  pokemons: { name: string; url: string }[];
  pokemonsWithTypes: any[];
  allNames: { name: string; url: string }[];
}

const PokemonsPage: React.FC<PokemonsPageProps> = ({
  pokemons,
  pokemonsWithTypes,
  allNames,
}) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Pokedex </title>
      </Head>
      <PokemonPage
        pageNr={Number(router.query.pagenumber)}
        pokemons={pokemons}
        pokemonsWithTypes={pokemonsWithTypes}
        allNames={allNames}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const pagenumber: any = context.params.pagenumber;
  const apiUrl = publicApi;

  if (pagenumber > lastAccessiblePage) {
    return {
      notFound: true,
    };
  }
  const url = getPageUrl(pagenumber);
  const data = await cachedJsonFetch(url);
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

export default PokemonsPage;
